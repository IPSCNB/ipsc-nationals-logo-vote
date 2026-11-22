import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const c=window.VOTE_CONFIG, msg=document.getElementById('message'), form=document.getElementById('voteForm');
const configured=c?.supabaseUrl?.startsWith('https://') && c?.supabaseAnonKey && !c.supabaseAnonKey.includes('PASTE_');
if(!configured){msg.textContent='Voting is not connected yet. The organizer must finish online storage setup.';msg.className='error';document.getElementById('submit').disabled=true;}
const db=configured?createClient(c.supabaseUrl,c.supabaseAnonKey):null;
form.addEventListener('submit',async(e)=>{e.preventDefault();if(!db)return;
const logo=new FormData(form).get('logo'), voter_name=document.getElementById('voterName').value.trim(),notes=document.getElementById('notes').value.trim();if(!logo||!voter_name)return;
const btn=document.getElementById('submit');btn.disabled=true;msg.textContent='Saving your vote…';msg.className='';
try{const {error}=await db.from('votes').insert({logo_id:logo,voter_name,notes:notes||null});if(error)throw error;
form.reset();msg.textContent='Your vote was saved. Thank you! You can vote again.';msg.className='success';
}catch(err){msg.textContent='Could not save your vote. Please try again.';msg.className='error';}finally{btn.disabled=false;}
});
