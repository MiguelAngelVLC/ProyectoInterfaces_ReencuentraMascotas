// Lógica para abrir el modal con los datos de la tarjeta

function initModal() {
  const overlay = document.getElementById('animalModal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.modal-close');
  const modalImage = overlay.querySelector('.modal-imagen');
  const modalName = overlay.querySelector('.modal-nombre');
  const modalRaza = overlay.querySelector('.modal-raza');
  const modalEstado = overlay.querySelector('.modal-estado');
  const modalDesc = overlay.querySelector('.modal-descripcion');
  const modalUbicacion = overlay.querySelector('.modal-ubicacion');
  const modalFecha = overlay.querySelector('.modal-fecha');
  const modalContactoNombre = overlay.querySelector('.modal-contacto-nombre');
  const modalContactoTelefono = overlay.querySelector('.modal-contacto-telefono');

  function openModalFromCard(card) {
    const img = card.querySelector('.imagen-tarjeta-animal');
    modalImage.src = img ? img.src : '';
    modalImage.alt = img ? img.alt : '';

    modalName.textContent = card.querySelector('.nombre-animal')?.textContent || '';
    modalRaza.textContent = card.querySelector('.raza-animal')?.textContent || '';

    const estadoText = card.querySelector('.insignia-estado')?.textContent?.trim() || '';
    modalEstado.textContent = estadoText;
    if (/ENCONTRAD/i.test(estadoText)) {
      modalEstado.style.background = '#4ecdc4';
    } else if (/PERDID/i.test(estadoText)) {
      modalEstado.style.background = '#ff6b6b';
    } else {
      modalEstado.style.background = '#868e96';
    }

    modalDesc.textContent = card.querySelector('.descripcion-animal')?.textContent || '';

    // Tomamos las dos primeras .info-animal para ubicación y fecha
    const infos = card.querySelectorAll('.info-animal');
    modalUbicacion.innerHTML = infos[0]?.innerHTML || '';
    modalFecha.innerHTML = infos[1]?.innerHTML || '';

    // Contacto
    modalContactoNombre.innerHTML = card.querySelector('.seccion-contacto .info-contacto:nth-of-type(1)')?.innerHTML || '';
    modalContactoTelefono.innerHTML = card.querySelector('.seccion-contacto .info-contacto:nth-of-type(2)')?.innerHTML || '';

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Accessibility
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Abrir al clicar tarjeta
  document.querySelectorAll('.tarjeta-animal').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => openModalFromCard(card));
  });

  // Cerrar al pulsar el botón
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });

  // Cerrar al clicar fuera del modal (en overlay)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  // Filtrado: Mostrar solo reportes según estado (Perdidos / Encontrados)
  const filterPerdidos = document.getElementById('filter-perdidos');
  const filterEncontrados = document.getElementById('filter-encontrados');
  const cards = document.querySelectorAll('.tarjeta-animal');

  function clearFilters() {
    cards.forEach(c => c.classList.remove('hidden'));
    document.querySelectorAll('.nav-link.filter-active').forEach(n => n.classList.remove('filter-active','perdido','encontrado'));
  }

  function applyFilter(type, linkEl) {
    const typeClass = type === 'perdido' ? 'perdido' : 'encontrado';
    const isActive = linkEl.classList.contains('filter-active') && linkEl.classList.contains(typeClass);
    if (isActive) {
      clearFilters();
      return;
    }

    // Limpiar estado de enlaces activos (pero no mostrar todas las tarjetas)
    document.querySelectorAll('.nav-link.filter-active').forEach(n => n.classList.remove('filter-active','perdido','encontrado'));

    // Aplicar filtro: ocultar tarjetas que NO coincidan con el tipo
    cards.forEach(card => {
      const match = Boolean(card.querySelector('.insignia-estado.' + typeClass));
      card.classList.toggle('hidden', !match);
    });

    // Marcar enlace como activo según tipo
    linkEl.classList.add('filter-active');
    linkEl.classList.add(typeClass);
  }

  if (filterPerdidos) {
    filterPerdidos.addEventListener('click', (e) => {
      e.preventDefault();
      applyFilter('perdido', filterPerdidos);
    });
  }

  if (filterEncontrados) {
    filterEncontrados.addEventListener('click', (e) => {
      e.preventDefault();
      applyFilter('encontrado', filterEncontrados);
    });
  }

  // Botón "Ver todos" restablece filtros
  const btnVerTodos = document.getElementById('btn-ver-todos');
  if (btnVerTodos) {
    btnVerTodos.addEventListener('click', (e) => {
      e.preventDefault();
      clearFilters();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModal);
} else {
  initModal();
}
