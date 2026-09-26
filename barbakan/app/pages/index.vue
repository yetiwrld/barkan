<template>
  <div class="home-page">
    <section class="hero">
      <div class="container">
        <h1>Barbakan Deli</h1>
        <p class="tagline">Authentic Polish delicatessen since 1996</p>
        <div class="hero-buttons">
          <NuxtLink to="/order" class="btn btn-primary btn-lg">Order Online</NuxtLink>
          <NuxtLink to="/#story" class="btn btn-secondary btn-lg">Our Story</NuxtLink>
        </div>
      </div>
    </section>

    <section id="story" class="section section-light">
      <div class="container">
        <h2>Our Story</h2>
        <p>Founded in 1996 in Chorlton, Manchester, Barbakan Deli brings the finest Polish delicacies to the UK. From traditional pierogi to smoked meats, we craft each product with authentic recipes passed down through generations.</p>
        <p>Our commitment to quality and tradition has made us a beloved destination for Polish food enthusiasts and curious foodies alike.</p>
      </div>
    </section>

    <section class="section section-accent">
      <div class="container">
        <h2>Featured Products</h2>
        <div class="products-preview">
          <div class="product-preview-card">
            <h3>Pierogi Ruskie</h3>
            <p>Traditional dumplings with potato and cheese</p>
            <NuxtLink to="/order" class="btn btn-sm">Order Now</NuxtLink>
          </div>
          <div class="product-preview-card">
            <h3>Kielbasa</h3>
            <p>Traditional Polish smoked sausage</p>
            <NuxtLink to="/order" class="btn btn-sm">Order Now</NuxtLink>
          </div>
          <div class="product-preview-card">
            <h3>Bigos</h3>
            <p>Traditional hunter''s stew</p>
            <NuxtLink to="/order" class="btn btn-sm">Order Now</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <h2>Locations</h2>
        <div class="locations-grid">
          <div class="location-card">
            <h3>Chorlton</h3>
            <p>516 Wilbraham Road<br>Manchester, M21 9AS</p>
            <p><strong>Tel:</strong> 0161 881 7053</p>
            <p>barbakan.deli@hotmail.com</p>
          </div>
          <div class="location-card">
            <h3>Wilmslow</h3>
            <p>12 Grove Street<br>Wilmslow, SK9 1ER</p>
            <p>wilmslow@barbakan-deli.co.uk</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({ title: 'Home - Barbakan Deli' })
</script>
