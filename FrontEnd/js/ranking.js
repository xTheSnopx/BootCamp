// Datos de los jugadores (puedes modificar esto según tus necesidades)
const playersData = [
    { name: "Jugador 7", points: 400, avatar: "https://via.placeholder.com/50/FFD700/000000?text=1" },
    { name: "Jugador 7", points: 350, avatar: "https://via.placeholder.com/50/C0C0C0/000000?text=2" },
    { name: "Jugador 7", points: 200, avatar: "https://via.placeholder.com/50/CD7F32/000000?text=3" },
    { name: "Jugador 7", points: 100, avatar: "https://via.placeholder.com/50/808080/FFFFFF?text=4" },
    { name: "Jugador 7", points: 0, avatar: "https://via.placeholder.com/50/FF69B4/000000?text=5" },
    { name: "Jugador 7", points: 0, avatar: "https://via.placeholder.com/50/DEB887/000000?text=6" },
    { name: "Jugador 7", points: 0, avatar: "https://via.placeholder.com/50/8B4513/FFFFFF?text=7" }
];

// Función para animar los números de puntos
function animatePoints() {
    const pointElements = document.querySelectorAll('.points');
    
    pointElements.forEach((element, index) => {
        const finalPoints = playersData[index].points;
        let currentPoints = 0;
        const increment = finalPoints / 50; // Dividir la animación en 50 pasos
        
        const timer = setInterval(() => {
            currentPoints += increment;
            if (currentPoints >= finalPoints) {
                currentPoints = finalPoints;
                clearInterval(timer);
            }
            element.textContent = `⭐ ${Math.floor(currentPoints)} Pts.`;
        }, 30);
    });
}

// Función para agregar efectos de hover y click
function addInteractivity() {
    const playerRows = document.querySelectorAll('.player-row');
    
    playerRows.forEach((row, index) => {
        // Efecto de click
        row.addEventListener('click', () => {
            // Añadir animación de click
            row.style.transform = 'scale(0.98)';
            setTimeout(() => {
                row.style.transform = '';
            }, 150);
            
            // Mostrar información del jugador (opcional)
            console.log(`Jugador en posición ${index + 1}: ${playersData[index].points} puntos`);
        });
        
        // Efecto de entrada escalonada
        row.style.opacity = '0';
        row.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.5s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Función para actualizar la tabla con nuevos datos
function updateLeaderboard(newData) {
    // Ordenar datos por puntos (mayor a menor)
    newData.sort((a, b) => b.points - a.points);
    
    const playerRows = document.querySelectorAll('.player-row');
    
    playerRows.forEach((row, index) => {
        if (newData[index]) {
            const nameElement = row.querySelector('.player-name');
            const pointsElement = row.querySelector('.points');
            const avatarElement = row.querySelector('.avatar img');
            
            nameElement.textContent = newData[index].name;
            pointsElement.textContent = `⭐ ${newData[index].points} Pts.`;
            avatarElement.src = newData[index].avatar;
        }
    });
}

// Función para crear efectos de partículas (opcional)
function createParticles() {
    const container = document.querySelector('.background');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255,255,255,0.3)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Animación flotante
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(particle);
    }
}

// CSS para la animación de partículas
const particleCSS = `
@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.3;
    }
    50% {
        transform: translateY(-20px) rotate(180deg);
        opacity: 0.8;
    }
}
`;

// Agregar CSS de partículas
const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    addInteractivity();
    animatePoints();
    createParticles();
    
    // Ejemplo de cómo actualizar la tabla después de 5 segundos (opcional)
    // setTimeout(() => {
    //     const newData = [
    //         { name: "Nuevo Jugador", points: 500, avatar: "https://via.placeholder.com/50/00FF00/000000?text=N" },
    //         ...playersData.slice(0, 6)
    //     ];
    //     updateLeaderboard(newData);
    // }, 5000);
});

// Exportar funciones para uso externo
window.LeaderboardManager = {
    updateLeaderboard,
    playersData
};