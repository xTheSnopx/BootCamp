// Variables globales
let players = [];
let currentPlayerIndex = null;
let totalPlayers = 4;

// Avatares disponibles
const availableAvatars = [
    'avatar1.png',
    'avatar2.png',
    'avatar3.png',
    'avatar4.png',
    'avatar5.png',
    'avatar6.png'
];

// Inicializar la aplicación
function initializeApp() {
    loadPlayersFromStorage();
    renderPlayers();
    renderAvatarOptions();
}

// Cargar jugadores desde localStorage
function loadPlayersFromStorage() {
    // Obtener datos de jugadores guardados
    const savedPlayersData = localStorage.getItem('playersData');
    const savedPlayerNames = localStorage.getItem('playerNames');
    const savedTotalPlayers = localStorage.getItem('totalPlayers');
    
    if (savedPlayersData) {
        // Si existe playersData, usarlo
        players = JSON.parse(savedPlayersData);
    } else if (savedPlayerNames) {
        // Si solo existen nombres, crear estructura de jugadores
        const names = JSON.parse(savedPlayerNames);
        players = names.map((name, index) => ({
            name: name,
            avatar: `avatar${(index % 4) + 1}.png`
        }));
    } else {
        // Datos por defecto si no hay nada guardado
        players = [
            { name: "Jugador 1", avatar: "avatar1.png" },
            { name: "Jugador 2", avatar: "avatar2.png" },
            { name: "Jugador 3", avatar: "avatar3.png" },
            { name: "Jugador 4", avatar: "avatar4.png" }
        ];
    }
    
    // Obtener total de jugadores
    if (savedTotalPlayers) {
        totalPlayers = parseInt(savedTotalPlayers);
        // Ajustar el array de jugadores al número correcto
        if (players.length > totalPlayers) {
            players = players.slice(0, totalPlayers);
        } else if (players.length < totalPlayers) {
            // Agregar jugadores adicionales si faltan
            for (let i = players.length; i < totalPlayers; i++) {
                players.push({
                    name: `Jugador ${i + 1}`,
                    avatar: `avatar${(i % 4) + 1}.png`
                });
            }
        }
    }
}

// Renderizar lista de jugadores
function renderPlayers() {
    const playersList = document.getElementById("playersList");
    playersList.innerHTML = "";

    players.forEach((player, index) => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <img src="/Img/${player.avatar}" class="avatar" alt="Avatar de ${player.name}">
            <h3>${player.name}</h3>
            <button onclick="openAvatarSelector(${index})">Cambiar Avatar</button>
        `;
        playersList.appendChild(playerCard);
    });
}

// Renderizar opciones de avatares
function renderAvatarOptions() {
    const avatarOptions = document.getElementById("avatarOptions");
    avatarOptions.innerHTML = "";

    availableAvatars.forEach(avatar => {
        const avatarImg = document.createElement('img');
        avatarImg.src = `/Img/${avatar}`;
        avatarImg.alt = avatar;
        avatarImg.onclick = () => selectAvatar(avatar);
        avatarOptions.appendChild(avatarImg);
    });
}

// Abrir selector de avatar
function openAvatarSelector(index) {
    currentPlayerIndex = index;
    document.getElementById("avatarSelector").style.display = "block";
    
    // Opcional: destacar el avatar actual
    highlightCurrentAvatar();
}

// Destacar avatar actual del jugador
function highlightCurrentAvatar() {
    if (currentPlayerIndex === null) return;
    
    const currentAvatar = players[currentPlayerIndex].avatar;
    const avatarImages = document.querySelectorAll('#avatarOptions img');
    
    avatarImages.forEach(img => {
        img.style.border = '';
        if (img.alt === currentAvatar) {
            img.style.border = '3px solid #f39c12';
            img.style.borderRadius = '50%';
        }
    });
}

// Cancelar selección
function cancelSelection() {
    currentPlayerIndex = null;
    document.getElementById("avatarSelector").style.display = "none";
    
    // Remover destacado de avatares
    const avatarImages = document.querySelectorAll('#avatarOptions img');
    avatarImages.forEach(img => {
        img.style.border = '';
    });
}

// Seleccionar avatar
function selectAvatar(filename) {
    if (currentPlayerIndex !== null) {
        players[currentPlayerIndex].avatar = filename;
        
        // Guardar cambios en localStorage
        savePlayersToStorage();
        
        // Actualizar vista
        renderPlayers();
        cancelSelection();
        
        // Mostrar confirmación
        showNotification(`Avatar actualizado para ${players[currentPlayerIndex].name}`);
    }
}

// Guardar jugadores en localStorage
function savePlayersToStorage() {
    localStorage.setItem('playersData', JSON.stringify(players));
    
    // También actualizar playerNames por compatibilidad
    const names = players.map(player => player.name);
    localStorage.setItem('playerNames', JSON.stringify(names));
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // Agregar animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para continuar al juego
function startGame() {
    // Guardar datos finales
    savePlayersToStorage();
    
    // Redirigir al juego
    window.location.href = 'game.html';
}

// Función para volver a la pantalla anterior
function goBack() {
    window.location.href = 'nombreJugadores.html';
}

// Función para resetear (útil para desarrollo)
function resetLobby() {
    localStorage.removeItem('playersData');
    localStorage.removeItem('playerNames');
    localStorage.removeItem('totalPlayers');
    localStorage.removeItem('selectedPlayersCount');
    location.reload();
}

// Funciones para obtener datos (para usar en otras pantallas)
function getPlayersData() {
    return players;
}

function getTotalPlayersCount() {
    return totalPlayers;
}

// Inicializar cuando se carga la página
document.addEventListener("DOMContentLoaded", initializeApp);