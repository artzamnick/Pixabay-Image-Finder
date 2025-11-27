import{a as d,S as h,i as n}from"./assets/vendor-MgecxatS.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const y="53386228-9ccf01ca4b721fbc8928b7547",g="https://pixabay.com/api/";function b(i,r=1,e=40){return d.get(g,{params:{key:y,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:e}}).then(s=>s.data)}const u=".gallery",L=".loader",a=document.querySelector(u),c=document.querySelector(L),f=new h(`${u} a`,{captionsData:"alt",captionDelay:250});function R(i){if(!a)return;const r=i.map(e=>`
        <li class="gallery__item">
        <a class="gallery__link" href="${e.largeImageURL}">
            <div class="photo-card">
            <img class="photo-card__img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item"><b>Likes</b><br>${e.likes}</p>
                <p class="info-item"><b>Views</b><br>${e.views}</p>
                <p class="info-item"><b>Comments</b><br>${e.comments}</p>
                <p class="info-item"><b>Downloads</b><br>${e.downloads}</p>
            </div>
            </div>
        </a>
        </li>
        `).join("");a.insertAdjacentHTML("beforeend",r),f.refresh()}function S(){a&&(a.innerHTML="",f.refresh())}function v(){c&&c.classList.remove("is-hidden")}function w(){c&&c.classList.add("is-hidden")}const m=document.querySelector(".form"),p=document.querySelector(".form-input");(!m||!p)&&console.error("Не знайдено .form або .form-input в DOM.");m.addEventListener("submit",E);function E(i){i.preventDefault();const r=p.value.trim();if(!r){n.warning({title:"Увага",message:"Будь ласка, введіть слово для пошуку.",position:"topRight",timeout:3e3});return}S(),v(),b(r).then(e=>{if(!e||!Array.isArray(e.hits))throw new Error("Unexpected response from API");if(e.hits.length===0){n.info({title:"Немає результатів",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:4e3});return}R(e.hits),n.success({title:"Успіх",message:`Знайдено ${e.hits.length} зображень за запитом "${r}".`,position:"topRight",timeout:3e3})}).catch(e=>{console.error(e),n.error({title:"Помилка",message:"Не вдалося завантажити зображення. Перевірте інтернет-зʼєднання або повторіть спробу.",position:"topRight",timeout:5e3})}).finally(()=>{w()})}
//# sourceMappingURL=index.js.map
