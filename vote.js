import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const c=window.VOTE_CONFIG, msg=document.getElementById('message'), form=document.getElementById('voteForm');
const configured=c?.supabaseUrl?.startsWith('https://') && !c.supabaseAnonKey.includes('PASTE_');
if(!configured){msg.textContent='Setup required: add Supabase settings to config.js before publishing.';msg.className='error';document.getElementById('submit').disabled=true;}
const db=configured?createClient(c.supabaseUrl,c.supabaseAnonKey):null;
const key='ipsc2027-logo-voted';
if(localStorage.getItem(key)){form.querySelectorAll('input,textarea,button').forEach(x=>x.disabled=true);msg.textContent='Thanks! This browser has already submitted a vote.';msg.className='success';}
form.addEventListener('submit',async(e)=>{e.preventDefault();if(!db)return;if(localStorage.getItem(key))return;
const logo=new FormData(form).get('logo');if(!logo)return;const notes=document.getElementById('notes').value.trim();const btn=document.getElementById('submit');btn.disabled=true;msg.textContent='Saving your vote…';msg.className='';
try{let token=localStorage.getItem('ipsc2027-voter-token');if(!token){token=crypto.randomUUID();localStorage.setItem('ipsc2027-voter-token',token)}
const {error}=await db.from('votes').insert({logo_id:logo,notes:notes||null,voter_token:token});if(error)throw error;
localStorage.setItem(key,'yes');form.querySelectorAll('input,textarea,button').forEach(x=>x.disabled=true);msg.textContent='Your vote and notes have been saved. Thank you!';msg.className='success';
}catch(err){msg.textContent=err.code==='23505'?'This browser has already voted.':'Could not save your vote. Please try again.';msg.className='error';btn.disabled=false;}});
