let selectedPlayerCount = 0;

// Función para seleccionar cantidad de jugadores
function selectPlayers(count) {
    document.querySelectorAll('.player-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Seleccionar el botón actual
    const selectedBtn = document.querySelector(`[data-players="${count}"]`);
    selectedBtn.classList.add('selected');
    
    // Guardar la selección
    selectedPlayerCount = count;
    
    // Guardar en localStorage para las siguientes pantallas
    localStorage.setItem('selectedPlayersCount', count.toString());
    
    // Actualizar mensaje de estado
    updateStatusMessage();
    
    // Mostrar botón continuar
    showContinueButton();
    
    // Añadir efecto de feedback
    selectedBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        selectedBtn.style.transform = '';
    }, 200);
}

// Función para actualizar el mensaje de estado
function updateStatusMessage() {
    const statusElement = document.getElementById('statusMessage');
    
    if (selectedPlayerCount > 0) {
        statusElement.textContent = `${selectedPlayerCount} jugadores seleccionados. ¡Listo para continuar!`;
        statusElement.style.color = '#2ecc71';
    } else {
        statusElement.textContent = 'Selecciona la cantidad de jugadores para continuar';
        statusElement.style.color = 'white';
    }
}

// Función para mostrar el botón continuar
function showContinueButton() {
    const continueBtn = document.getElementById('continueBtn');
    
    if (selectedPlayerCount > 0) {
        continueBtn.style.display = 'block';
        // Animación de aparición
        continueBtn.style.opacity = '0';
        continueBtn.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            continueBtn.style.transition = 'all 0.3s ease';
            continueBtn.style.opacity = '1';
            continueBtn.style.transform = 'translateY(0)';
        }, 100);
    } else {
        continueBtn.style.display = 'none';
    }
}

// Función para continuar el juego
function continueGame() {
    if (selectedPlayerCount === 0) return;

    // Guardar toda la información necesaria en localStorage
    localStorage.setItem('selectedPlayersCount', selectedPlayerCount.toString());
    localStorage.setItem('totalPlayers', selectedPlayerCount.toString());
    
    // Limpiar datos previos por si acaso
    localStorage.removeItem('playerNames');
    localStorage.removeItem('playersData');

    // Redirigir a la pantalla de nombres con la cantidad seleccionada como parámetro
    window.location.href = `nombreJugadores.html?players=${selectedPlayerCount}`;
}

// Función para mostrar cartas
function showCards() {
    alert('Aquí se mostrarían las reglas y cartas del juego.\n\n¡Función por implementar!');
    
    // window.open('cards.html', '_blank');
}

// Función para cargar selección previa (si existe)
function loadPreviousSelection() {
    const savedSelection = localStorage.getItem('selectedPlayersCount');
    if (savedSelection && !isNaN(savedSelection)) {
        const count = parseInt(savedSelection);
        if (count >= 2 && count <= 7) {
            selectPlayers(count);
        }
    }
}

// Efectos adicionales al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar selección previa si existe
    loadPreviousSelection();
    
    // Añadir efectos de hover mejorados
    const playerBtns = document.querySelectorAll('.player-btn');
    
    playerBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });
    });
    
    // Efecto de aparición escalonada para los botones
    playerBtns.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.4s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});

// Manejo de teclas (opcional)
document.addEventListener('keydown', function(e) {
    // Permitir selección con teclas numéricas
    const keyNum = parseInt(e.key);
    if (keyNum >= 2 && keyNum <= 7) {
        selectPlayers(keyNum);
    }
    
    // Enter para continuar
    if (e.key === 'Enter' && selectedPlayerCount > 0) {
        continueGame();
    }
    
    // Escape para resetear selección
    if (e.key === 'Escape') {
        resetSelection();
    }
});

// Función para resetear la selección
function resetSelection() {
    selectedPlayerCount = 0;
    
    document.querySelectorAll('.player-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    updateStatusMessage();
    
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.style.display = 'none';
    
    // Limpiar localStorage
    localStorage.removeItem('selectedPlayersCount');
    localStorage.removeItem('totalPlayers');
}

// Función para validar la selección
function validateSelection() {
    return selectedPlayerCount >= 2 && selectedPlayerCount <= 7;
}

// Funciones adicionales para integración con otras pantallas
function getSelectedPlayerCount() {
    return selectedPlayerCount;
}

function setSelectedPlayerCount(count) {
    if (count >= 2 && count <= 7) {
        selectPlayers(count);
    }
}

// Función para ir a pantalla anterior (si existe)
function goBack() {
    window.history.back();
}

// Función para ir directamente al lobby (para testing)
function goToLobby() {
    if (selectedPlayerCount > 0) {
        localStorage.setItem('selectedPlayersCount', selectedPlayerCount.toString());
        localStorage.setItem('totalPlayers', selectedPlayerCount.toString());
        window.location.href = 'lobby.html';
    }
}

// Exportar funciones si se necesita modularidad
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectPlayers,
        continueGame,
        showCards,
        resetSelection,
        validateSelection,
        getSelectedPlayerCount,
        setSelectedPlayerCount
    };
}