import{l as m,g as p,a as b}from"./main-hBd3-FF4.js";import{p as l,c as E}from"./productos-DmPu_ryk.js";const c=document.getElementById("lista-categorias"),i=document.getElementById("contenedor-productos"),v=document.getElementById("titulo-productos"),L=document.getElementById("sin-resultados"),f=document.getElementById("form-busqueda"),u=document.getElementById("input-busqueda"),C=document.getElementById("usuario-actual"),y=document.getElementById("item-admin"),B=document.getElementById("logoutButton");let a="Todas";const h=t=>{const e=document.createElement("article");return e.classList.add("producto-card"),e.innerHTML=`
    <div class="producto-media">
      <img class="producto-foto" src="${t.imagen}" alt="${t.nombre}">
      <img class="producto-sticker" src="${t.sticker}" alt="">
    </div>
    <div class="producto-body">
      <span class="producto-categoria">${t.categoria}</span>
      <h3>${t.nombre}</h3>
      <p>${t.descripcion}</p>
      <p class="producto-precio">Precio: <strong>$${t.precio.toFixed(2)}</strong></p>
      <div class="producto-acciones">
        <button type="button" class="btn btn-secundario">Ver Detalles</button>
        <button type="button" class="btn btn-agregar">Agregar al Carrito</button>
      </div>
    </div>
  `,e.querySelector(".btn-agregar").addEventListener("click",()=>{alert(`Agregaste "${t.nombre}" al carrito`)}),e},g=t=>{i.innerHTML="",t.forEach(e=>{i.appendChild(h(e))}),L.classList.toggle("oculto",t.length>0)},r=()=>{const t=u.value.trim().toLowerCase(),e=l.filter(o=>{const s=a==="Todas"||o.categoria===a,n=o.nombre.toLowerCase().includes(t);return s&&n});v.textContent=a==="Todas"?"Productos Destacados":a,g(e)},d=t=>{const e=document.createElement("li"),o=document.createElement("a");return o.href="#",o.textContent=t,t===a&&o.classList.add("activa"),o.addEventListener("click",s=>{s.preventDefault(),a=t,c.querySelectorAll("a").forEach(n=>n.classList.remove("activa")),o.classList.add("activa"),r()}),e.appendChild(o),e},I=()=>{c.appendChild(d("Todas")),E.forEach(t=>{c.appendChild(d(t))})},$=()=>{const t=p();t&&(C.textContent=`Hola, ${t.email}`,y.classList.toggle("oculto",t.role!==b.ADMIN))};f.addEventListener("submit",t=>{t.preventDefault(),r()});u.addEventListener("input",r);B.addEventListener("click",()=>{m()});$();I();g(l);
