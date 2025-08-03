import{a as m,S as f,i as a}from"./assets/vendor-BK_rxH-O.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();async function p(s){const o=`https://pixabay.com/api/?key=51593230-95869a69d21a93ebacba8501d&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=28`;return(await m.get(o)).data.hits}const c=document.querySelector(".gallery");let g=new f(".gallery a",{captionsData:"alt",captionsDelay:250});function y(s){const r=s.map(({webformatURL:i,largeImageURL:o,tags:e,likes:t,views:n,comments:u,downloads:d})=>`
      <li class="gallery-item">
      <a href="${o}" class="gallery-item">
      <div class="image-card">
        <img src="${i}" alt="${e}" loading="lazy" />
        <ul class="image-stats">
          <li><b>Likes</b> ${t}</li>
          <li><b>Views</b> ${n}</li>
          <li><b>Comments</b> ${u}</li>
          <li><b>Downloads</b> ${d}</li>
        </ul>
      </div>
    </a>
    </li>
  `).join("");c.insertAdjacentHTML("beforeend",r),g.refresh()}function h(){c.innerHTML=""}function b(){document.querySelector(".loader").classList.remove("hidden")}function L(){document.querySelector(".loader").classList.add("hidden")}const w=document.querySelector(".form"),l=document.querySelector(".input");w.addEventListener("submit",async function(r){r.preventDefault();const i=l.value.trim();if(!i){a.info({title:"Empty",message:"Type something to search.",position:"topRight"});return}h(),b();try{const o=await p(i);await new Promise(e=>setTimeout(e,2e3)),o.length===0?(a.warning({title:"No results",message:`No images found for "${i}".  Try again.`,position:"topRight"}),l.value=""):(y(o),l.value="")}catch(o){a.error({title:"Error",message:`Something went wrong: ${o.message}.`,position:"topRight"})}finally{L()}});
//# sourceMappingURL=index.js.map
