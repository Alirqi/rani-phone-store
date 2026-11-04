// عدّل المنتجات والأسعار والصور هنا قبل إطلاق المتجر.
const WHATSAPP = "967774859996";
const products = [
  {id:1,brand:"Apple",name:"iPhone 15 Pro Max",price:999,specs:"256GB • Titanium • 5G",tag:"الأكثر طلباً",image:"https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_15_Pro_Max_Blue_Titanium.svg"},
  {id:2,brand:"Samsung",name:"Galaxy S24 Ultra",price:899,specs:"256GB • 12GB RAM • 5G",tag:"مميز",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Galaxy_S24_Ultra.png"},
  {id:3,brand:"Apple",name:"iPhone 14",price:599,specs:"128GB • Super Retina XDR",tag:"",image:"https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_14_vector.svg"},
  {id:4,brand:"Xiaomi",name:"Redmi Note 13 Pro",price:299,specs:"256GB • 8GB RAM • AMOLED",tag:"قيمة رائعة",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Xiaomi_Redmi_Note_13_Pro_5G.png"},
  {id:5,brand:"Samsung",name:"Galaxy A55 5G",price:379,specs:"128GB • 8GB RAM • 5G",tag:"",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Galaxy_A55_5G.png"},
  {id:6,brand:"Xiaomi",name:"Xiaomi 14",price:699,specs:"512GB • Leica Camera",tag:"",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Xiaomi_14.png"},
  {id:7,brand:"Apple",name:"iPhone 13",price:449,specs:"128GB • A15 Bionic",tag:"",image:"https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_13_vector.svg"},
  {id:8,brand:"Samsung",name:"Galaxy A15",price:169,specs:"128GB • 6GB RAM",tag:"اقتصادي",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Galaxy_A15.png"}
];
let cart = [];
let activeFilter = "الكل";
const grid = document.getElementById("productGrid");
const money = n => "$" + n.toLocaleString("en-US");
function renderProducts(){
  const q = document.getElementById("search").value.trim().toLowerCase();
  const shown = products.filter(p => (activeFilter==="الكل" || p.brand===activeFilter) && (p.name.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q)));
  grid.innerHTML = shown.length ? shown.map(p=>`<article class="product-card"><div class="product-image">${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : `<div class="fallback-phone" aria-label="صورة توضيحية للهاتف"></div>`}${p.tag?`<span class="tag">${p.tag}</span>`:""}</div><div class="product-info"><span class="product-brand">${p.brand}</span><h3>${p.name}</h3><div class="specs">${p.specs}</div><div class="product-bottom"><span class="price">${money(p.price)} <small>USD</small></span><button class="add-btn" onclick="addToCart(${p.id})">＋ أضف للسلة</button></div></div></article>`).join("") : `<p class="empty">لا توجد نتائج مطابقة لبحثك.</p>`;
}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...p,qty:1});renderCart();openCart();}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);renderCart();}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><div><b>${x.name}</b><small>${x.qty} × ${money(x.price)}</small></div><button class="remove" onclick="removeFromCart(${x.id})">حذف</button></div>`).join(""):`<p class="empty">سلتك فارغة حالياً.</p>`;
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show");}
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("search").addEventListener("input",renderProducts);
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("button[data-filter]");if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
document.getElementById("checkout").addEventListener("click",()=>{if(!cart.length){alert("أضف هاتفاً إلى السلة أولاً.");return;}const lines=cart.map(x=>`• ${x.name} — ${x.qty} × ${money(x.price)}`).join("\n");const total=money(cart.reduce((s,x)=>s+x.price*x.qty,0));const msg=`مرحباً راني فون، أود طلب المنتجات التالية:\n${lines}\nالإجمالي: ${total}\nالرجاء تأكيد التوفر والتوصيل.`;window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank","noopener");});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
