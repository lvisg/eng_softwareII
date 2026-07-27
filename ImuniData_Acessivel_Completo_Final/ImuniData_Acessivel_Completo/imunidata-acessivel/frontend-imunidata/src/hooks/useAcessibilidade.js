import { useCallback, useEffect, useState } from 'react'

function textoDo(el){if(!el)return'';const custom=el.getAttribute('data-speak');if(custom)return custom;const aria=el.getAttribute('aria-label');if(aria)return aria;if(el.labels?.length){const label=[...el.labels].map(x=>x.textContent.trim()).join(' ');const value=el.value?.trim();return value?`${label}. Valor atual: ${value}`:label}return el.textContent?.trim()||''}

const FONTE_MIN = 90
const FONTE_MAX = 130
const FONTE_PASSO = 10

export default function useAcessibilidade(){
 const [leituraAtiva,setLeituraAtiva]=useState(()=>localStorage.getItem('imunidata-leitura')==='true')
 const [mensagemLeitura,setMensagemLeitura]=useState('')
 const [contrasteAtivo,setContrasteAtivo]=useState(()=>localStorage.getItem('imunidata-contraste')==='true')
 const [fonteEscala,setFonteEscala]=useState(()=>Number(localStorage.getItem('imunidata-fonte'))||100)
 const suporta=typeof window!=='undefined'&&'speechSynthesis'in window&&'SpeechSynthesisUtterance'in window

 const pararLeitura=useCallback(()=>{if(suporta)window.speechSynthesis.cancel();setMensagemLeitura('Leitura interrompida.')},[suporta])
 const falar=useCallback(texto=>{if(!leituraAtiva||!suporta||!texto?.trim())return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(texto.trim());u.lang='pt-BR';u.rate=.95;const voz=window.speechSynthesis.getVoices().find(v=>v.lang?.toLowerCase().startsWith('pt-br'));if(voz)u.voice=voz;u.onstart=()=>setMensagemLeitura(`Lendo: ${texto}`);u.onend=()=>setMensagemLeitura('Leitura concluída.');window.speechSynthesis.speak(u)},[leituraAtiva,suporta])
 const alternarLeitura=useCallback(()=>setLeituraAtiva(v=>{const n=!v;localStorage.setItem('imunidata-leitura',String(n));if(!n&&suporta)window.speechSynthesis.cancel();return n}),[suporta])

 const alternarContraste=useCallback(()=>{
  setContrasteAtivo(v=>{
   const n=!v
   localStorage.setItem('imunidata-contraste',String(n))
   setMensagemLeitura(n ? 'Alto contraste ativado.' : 'Alto contraste desativado.')
   return n
  })
 },[])

 const alterarTamanhoFonte=useCallback((direcao)=>{
  setFonteEscala(v=>{
   const n=Math.min(FONTE_MAX, Math.max(FONTE_MIN, v + direcao*FONTE_PASSO))
   localStorage.setItem('imunidata-fonte',String(n))
   setMensagemLeitura(`Tamanho da fonte: ${n}%`)
   return n
  })
 },[])

 useEffect(()=>{
  document.documentElement.classList.toggle('alto-contraste', contrasteAtivo)
 },[contrasteAtivo])

 useEffect(()=>{
  document.documentElement.style.setProperty('--fonte-escala', `${fonteEscala}%`)
 },[fonteEscala])

 useEffect(()=>{
  if(!leituraAtiva)return
  let ultimo=null,tempo=0
  const ler=e=>{const el = e.target.closest('button,a,input,select,textarea,h1,h2,h3,td,th,[data-speak]');if(!el)return;const agora=Date.now();if(el===ultimo&&agora-tempo<1000)return;ultimo=el;tempo=agora;falar(textoDo(el))}
  document.addEventListener('focusin',ler)
  document.addEventListener('mouseover',ler)
  return()=>{document.removeEventListener('focusin',ler);document.removeEventListener('mouseover',ler)}
 },[leituraAtiva,falar])

 useEffect(()=>{
  const focar=id=>{const el=document.getElementById(id);if(el){el.focus();el.scrollIntoView({behavior:'smooth',block:'start'})}}
  const atalho=e=>{
   if(!e.altKey)return
   const k=e.key.toLowerCase()
   if(['l','p','1','2','3','c','+','-'].includes(k))e.preventDefault()
   if(k==='l')alternarLeitura()
   if(k==='p')pararLeitura()
   if(k==='c')alternarContraste()
   if(k==='+')alterarTamanhoFonte(1)
   if(k==='-')alterarTamanhoFonte(-1)
   if(k==='1')focar('formulario-vacinacao')
   if(k==='2')focar('filtros-vacinacao')
   if(k==='3')focar('historico-vacinacao')
  }
  document.addEventListener('keydown',atalho)
  return()=>document.removeEventListener('keydown',atalho)
 },[alternarLeitura,pararLeitura,alternarContraste,alterarTamanhoFonte])

 return{
  leituraAtiva,mensagemLeitura,navegadorSuportaVoz:suporta,pararLeitura,alternarLeitura,
  contrasteAtivo,alternarContraste,
  fonteEscala,alterarTamanhoFonte
 }
}