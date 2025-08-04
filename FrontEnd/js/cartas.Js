        function createCard(cardData, index) {
            return `
                <div class="card" onclick="selectCard(${cardData.id})">
                    <div class="card-badge">${index + 1}</div>
                    <div class="card-image">
                        🏍️
                    </div>
                    <div class="card-info">
                        <div class="card-title">${cardData.title}</div>
                        <div class="card-details">
                            <div class="card-detail-row">
                                <span class="card-detail-label">Cilindrada:</span>
                                <span class="card-detail-value">${cardData.specs.cilindrada}</span>
                            </div>
                            <div class="card-detail-row">
                                <span class="card-detail-label">Vel. Máx:</span>
                                <span class="card-detail-value">${cardData.specs.velocidad}</span>
                            </div>
                            <div class="card-detail-row">
                                <span class="card-detail-label">Potencia:</span>
                                <span class="card-detail-value">${cardData.specs.potencia}</span>
                            </div>
                            <div class="card-detail-row">
                                <span class="card-detail-label">Modelo:</span>
                                <span class="card-detail-value">${cardData.specs.modelo}</span>
                            </div>
                            <div class="card-detail-row">
                                <span class="card-detail-label">Precio:</span>
                                <span class="card-detail-value">${cardData.specs.precio}</span>
                            </div>
                            <div class="card-detail-row">
                                <span class="card-detail-label">Ac. 0-100:</span>
                                <span class="card-detail-value">${cardData.specs.aceleracion}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderCards() {
            const cardsGrid = document.getElementById('cardsGrid');
            
            // Crear todas las cartas disponibles más espacios vacíos para llegar a 56
            let cardsHTML = '';
            
            // Cartas con datos
            cardsData.forEach((card, index) => {
                cardsHTML += createCard(card, index);
            });
            
            // Espacios vacíos para cartas adicionales
            for (let i = cardsData.length; i < 56; i++) {
                cardsHTML += `
                    <div class="card" onclick="addNewCard(${i})">
                        <div class="card-badge">${i + 1}</div>
                        <div class="card-image">
                            ➕
                        </div>
                        <div class="card-info">
                            <div class="card-title">AGREGAR CARTA</div>
                            <div class="card-details">
                                <div class="card-detail-row">
                                    <span class="card-detail-label">Click para</span>
                                    <span class="card-detail-value">añadir</span>
                                </div>
                                <div class="card-detail-row">
                                    <span class="card-detail-label">nueva</span>
                                    <span class="card-detail-value">carta</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            cardsGrid.innerHTML = cardsHTML;
        }

        function selectCard(cardId) {
            const card = cardsData.find(c => c.id === cardId);
            if (card) {
                alert(`Has seleccionado: ${card.title}`);
            }
        }

        function addNewCard(index) {
            alert(`Agregar nueva carta en posición ${index + 1}`);
            // Aquí puedes implementar la lógica para agregar una nueva carta
        }

        function closeModal() {
            document.querySelector('.modal-overlay').style.opacity = '0';
            setTimeout(() => {
                alert('Modal cerrado');
                // Aquí puedes implementar la lógica para cerrar el modal
            }, 300);
        }

        function previousPage() {
            const content = document.querySelector('.modal-content');
            content.scrollTop = Math.max(0, content.scrollTop - 400);
        }

        function nextPage() {
            const content = document.querySelector('.modal-content');
            content.scrollTop = Math.min(content.scrollHeight, content.scrollTop + 400);
        }

        function scrollToTop() {
            const content = document.querySelector('.modal-content');
            content.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Inicializar la aplicación
        document.addEventListener('DOMContentLoaded', function() {
            renderCards();
        });

        // Manejar scroll con rueda del mouse
        document.querySelector('.modal-content').addEventListener('wheel', function(e) {
            e.preventDefault();
            this.scrollTop += e.deltaY;
        });