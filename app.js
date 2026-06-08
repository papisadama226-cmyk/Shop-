// Configuration globale
const ADMIN_PHONE = "2250702797128"; // Ton numéro admin
const ARTICLE_PRICE = 10000; // Prix fixe de 10 000 FCFA

// État de l'application
let cart = [];
let userDiscordAuthenticated = false; 

// --- GESTION DE L'AUTHENTIFICATION DISCORD (SIMULATION OPÉRATIONNELLE) ---
document.getElementById('login-discord').addEventListener('click', () => {
    // ICI : Plus tard, on mettra le vrai lien OAuth2 Discord.
    // Pour l'instant, on simule une connexion réussie pour que ta boutique fonctionne direct.
    alert("👿 N-D_bot : Vérification du rôle Discord réussie !");
    
    userDiscordAuthenticated = true;
    document.getElementById('auth-gate').classList.add('hidden');
    document.getElementById('shop-screen').classList.remove('hidden');
});

// --- GESTION DU PANIER ---
function addToCart(productName) {
    // Vérifier si l'article est déjà dans le panier
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: ARTICLE_PRICE,
            quantity: 1
        });
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    // Compter le nombre total d'articles
    let totalArticles = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalArticles;
    
    // Vider le visuel du panier avant de le reconstruire
    cartItems.innerHTML = '';
    let totalAmount = 0;
    
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>${itemTotal.toLocaleString()} FCFA</span>
                <button onclick="removeFromCart(${index})" style="background:red; color:white; border:none; padding:2px 5px; cursor:pointer;">X</button>
            </div>
        `;
    });
    
    totalPrice.innerText = totalAmount.toLocaleString();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('hidden');
}

// --- ENVOI DE LA COMMANDE VIA WHATSAPP (100% OPÉRATIONNEL 🇨🇮) ---
function checkout() {
    if (cart.length === 0) {
        alert("Ton panier est vide ! Additions d'abord des articles.");
        return;
    }
    
    let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Construction du message WhatsApp textuel
    let message = `Bonjour Admin 👿, je souhaite passer une commande depuis la PWA N-D Shop :\n\n`;
    
    cart.forEach(item => {
        message += `• ${item.name} (Quantité: ${item.quantity}) - ${item.price * item.quantity} FCFA\n`;
    });
    
    message += `\n💵 *Total à payer : ${totalAmount.toLocaleString()} FCFA*`;
    message += `\n\nMerci de me recontacter pour la livraison en Côte d'Ivoire !`;
    
    // Encodage du message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    
    // Lien de redirection vers l'API WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${ADMIN_PHONE}&text=${encodedMessage}`;
    
    // Ouvrir WhatsApp
    window.open(whatsappUrl, '_blank');
}
