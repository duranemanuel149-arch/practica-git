document.addEventListener("DOMContentLoaded", () => {
  // =====================================================
  // ELEMENTOS PRINCIPALES
  // =====================================================

  const productCards = document.querySelectorAll(".product-card");
  const filterButtons = document.querySelectorAll(".filter-button");
  const productCount = document.getElementById("productCount");

  const productModal = document.getElementById("productModal");
  const modalClose = document.getElementById("modalClose");
  const modalBackdrop = productModal?.querySelector(".modal-backdrop");

  const modalProductImage = document.getElementById("modalProductImage");
  const modalProductCategory = document.getElementById("modalProductCategory");
  const modalProductName = document.getElementById("modalProductName");
  const modalProductPrice = document.getElementById("modalProductPrice");
  const modalProductDescription = document.getElementById(
    "modalProductDescription",
  );

  const modalMovement = document.getElementById("modalMovement");
  const modalMaterial = document.getElementById("modalMaterial");
  const modalCrystal = document.getElementById("modalCrystal");
  const modalReserve = document.getElementById("modalReserve");

  const quantityMinus = document.getElementById("quantityMinus");
  const quantityPlus = document.getElementById("quantityPlus");
  const quantityElement = document.getElementById("quantity");

  const modalAddCart = document.getElementById("modalAddCart");

  const cartTrigger = document.getElementById("cartTrigger");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartClose = document.getElementById("cartClose");
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartCount = document.getElementById("cartCount");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartContinue = document.getElementById("cartContinue");
  const checkoutButton = document.getElementById("checkoutButton");

  const favoriteButtons = document.querySelectorAll(".favorite-button");

  let currentQuantity = 1;
  let currentProduct = null;

  let cart = [];

  // =====================================================
  // DATOS DE LOS PRODUCTOS
  // =====================================================

  const products = {
    "ÉLITE NOIR": {
      name: "ÉLITE NOIR",
      category: "CHRONOS / CLASSIC",
      price: 1299,
      image: "images/elite-noir.jpg",
      description:
        "Una pieza diseñada para quienes buscan precisión, carácter y una estética atemporal.",
      movement: "Automático",
      material: "Acero 316L",
      crystal: "Zafiro",
      reserve: "72 horas",
    },

    ARGENTUM: {
      name: "ARGENTUM",
      category: "CHRONOS / SPORT",
      price: 1499,
      image: "images/argentum.jpg",
      description:
        "Un reloj deportivo de líneas modernas que combina resistencia, precisión y elegancia.",
      movement: "Automático",
      material: "Acero 316L",
      crystal: "Zafiro",
      reserve: "72 horas",
    },

    OBSIDIAN: {
      name: "OBSIDIAN",
      category: "CHRONOS / LIMITED",
      price: 1799,
      image: "images/obsidian.jpg",
      description:
        "Una edición especial creada para coleccionistas que buscan exclusividad y personalidad.",
      movement: "Automático",
      material: "Acero premium",
      crystal: "Zafiro",
      reserve: "72 horas",
    },
  };

  // =====================================================
  // FILTROS DE COLECCIÓN
  // =====================================================

  function updateProductCount() {
    const visibleProducts = [...productCards].filter((card) => {
      return card.style.display !== "none";
    });

    if (productCount) {
      productCount.textContent = String(visibleProducts.length).padStart(
        2,
        "0",
      );
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      productCards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });

      updateProductCount();
    });
  });

  updateProductCount();

  // =====================================================
  // FAVORITOS
  // =====================================================

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      button.classList.toggle("active");

      if (button.classList.contains("active")) {
        button.innerHTML = "♥";
        button.setAttribute("aria-label", "Quitar de favoritos");
      } else {
        button.innerHTML = "♡";
        button.setAttribute("aria-label", "Añadir a favoritos");
      }
    });
  });

  // =====================================================
  // ABRIR MODAL DE PRODUCTO
  // =====================================================

  function openProductModal(product) {
    if (!product || !productModal) return;

    currentProduct = product;
    currentQuantity = 1;

    if (quantityElement) {
      quantityElement.textContent = "1";
    }

    if (modalProductImage) {
      modalProductImage.src = product.image;
      modalProductImage.alt = product.name;
    }

    if (modalProductCategory) {
      modalProductCategory.textContent = product.category;
    }

    if (modalProductName) {
      modalProductName.textContent = product.name;
    }

    if (modalProductPrice) {
      modalProductPrice.textContent =
        "$" + product.price.toLocaleString("en-US");
    }

    if (modalProductDescription) {
      modalProductDescription.textContent = product.description;
    }

    if (modalMovement) {
      modalMovement.textContent = product.movement;
    }

    if (modalMaterial) {
      modalMaterial.textContent = product.material;
    }

    if (modalCrystal) {
      modalCrystal.textContent = product.crystal;
    }

    if (modalReserve) {
      modalReserve.textContent = product.reserve;
    }

    productModal.classList.add("active");
    productModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }

  function closeProductModal() {
    if (!productModal) return;

    productModal.classList.remove("active");
    productModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
  }

  // =====================================================
  // BOTONES "VER DETALLES"
  // =====================================================

  productCards.forEach((card) => {
    const detailsButton = card.querySelector(".product-details");

    const productNameElement = card.querySelector("h3");

    if (!detailsButton || !productNameElement) return;

    detailsButton.addEventListener("click", () => {
      const productName = productNameElement.textContent.trim();

      const product = products[productName];

      openProductModal(product);
    });
  });

  // También permite hacer click sobre "VER PRODUCTO"
  document.querySelectorAll(".image-overlay").forEach((overlay) => {
    overlay.addEventListener("click", () => {
      const card = overlay.closest(".product-card");

      if (!card) return;

      const productName = card.querySelector("h3")?.textContent.trim();

      const product = products[productName];

      openProductModal(product);
    });
  });

  // =====================================================
  // CERRAR MODAL
  // =====================================================

  modalClose?.addEventListener("click", closeProductModal);

  modalBackdrop?.addEventListener("click", closeProductModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProductModal();
      closeCart();
    }
  });

  // =====================================================
  // CANTIDAD DEL PRODUCTO
  // =====================================================

  quantityPlus?.addEventListener("click", () => {
    currentQuantity++;

    if (quantityElement) {
      quantityElement.textContent = currentQuantity;
    }
  });

  quantityMinus?.addEventListener("click", () => {
    if (currentQuantity > 1) {
      currentQuantity--;
    }

    if (quantityElement) {
      quantityElement.textContent = currentQuantity;
    }
  });

  // =====================================================
  // CARRITO
  // =====================================================

  function openCart() {
    cartDrawer?.classList.add("active");
    cartOverlay?.classList.add("active");

    document.body.classList.add("cart-open");
  }

  function closeCart() {
    cartDrawer?.classList.remove("active");
    cartOverlay?.classList.remove("active");

    document.body.classList.remove("cart-open");
  }

  cartTrigger?.addEventListener("click", openCart);

  cartClose?.addEventListener("click", closeCart);

  cartOverlay?.addEventListener("click", closeCart);

  // =====================================================
  // AÑADIR AL CARRITO
  // =====================================================

  modalAddCart?.addEventListener("click", () => {
    if (!currentProduct) return;

    const existingProduct = cart.find(
      (item) => item.name === currentProduct.name,
    );

    if (existingProduct) {
      existingProduct.quantity += currentQuantity;
    } else {
      cart.push({
        ...currentProduct,
        quantity: currentQuantity,
      });
    }

    renderCart();

    closeProductModal();

    openCart();
  });

  // =====================================================
  // MOSTRAR CARRITO
  // =====================================================

  function renderCart() {
    if (!cartItems) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    // Contador
    if (cartCount) {
      cartCount.textContent = totalItems;
    }

    // Subtotal
    if (cartSubtotal) {
      cartSubtotal.textContent = "$" + subtotal.toLocaleString("en-US");
    }

    // Carrito vacío
    if (cart.length === 0) {
      cartItems.innerHTML = "";

      if (cartEmpty) {
        cartItems.appendChild(cartEmpty);
        cartEmpty.style.display = "flex";
      }

      return;
    }

    // Ocultar mensaje vacío
    if (cartEmpty) {
      cartEmpty.style.display = "none";
    }

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");

      cartItem.className = "cart-item";

      cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >
                </div>

                <div class="cart-item-info">

                    <span class="cart-item-category">
                        ${item.category}
                    </span>

                    <h3>
                        ${item.name}
                    </h3>

                    <div class="cart-item-bottom">

                        <div class="cart-item-quantity">

                            <button
                                type="button"
                                class="cart-minus"
                                data-index="${index}"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                type="button"
                                class="cart-plus"
                                data-index="${index}"
                            >
                                +
                            </button>

                        </div>

                        <strong>
                            $${(item.price * item.quantity).toLocaleString(
                              "en-US",
                            )}
                        </strong>

                    </div>

                    <button
                        type="button"
                        class="cart-remove"
                        data-index="${index}"
                    >
                        ELIMINAR
                    </button>

                </div>
            `;

      cartItems.appendChild(cartItem);
    });

    // Botones + y -
    document.querySelectorAll(".cart-plus").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);

        cart[index].quantity++;

        renderCart();
      });
    });

    document.querySelectorAll(".cart-minus").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);

        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }

        renderCart();
      });
    });

    // Eliminar
    document.querySelectorAll(".cart-remove").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);

        cart.splice(index, 1);

        renderCart();
      });
    });
  }

  // =====================================================
  // CONTINUAR COMPRANDO
  // =====================================================

  cartContinue?.addEventListener("click", () => {
    closeCart();

    document.getElementById("coleccion")?.scrollIntoView({
      behavior: "smooth",
    });
  });

  // =====================================================
  // FINALIZAR COMPRA
  // =====================================================

  checkoutButton?.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");

      return;
    }

    alert(
      "Gracias por tu compra en CHRONOS. El proceso de pago estará disponible próximamente.",
    );
  });

  // =====================================================
  // MENÚ MÓVIL
  // =====================================================

  const menuButton = document.querySelector(".menu-button");

  const navMenu = document.querySelector(".nav-menu");

  menuButton?.addEventListener("click", () => {
    navMenu?.classList.toggle("active");

    menuButton.classList.toggle("active");
  });

  // Cerrar menú al hacer click en un enlace
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("active");
      menuButton?.classList.remove("active");
    });
  });

  // =====================================================
  // SCROLL SUAVE
  // =====================================================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // =====================================================
  // ANIMACIÓN AL APARECER
  // =====================================================

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  document
    .querySelectorAll(
      ".product-card, .feature, .story-content, .section-heading",
    )
    .forEach((element) => {
      observer.observe(element);
    });

  // =====================================================
  // INICIALIZAR
  // =====================================================

  renderCart();
});
