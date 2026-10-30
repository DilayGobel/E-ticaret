#  E-Ticaret Sitesi

Trendyol benzeri modern ve responsive e-ticaret web sitesi. Vanilla JavaScript, HTML5 ve CSS3 kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### Ana Özellikler
- **Modern ve Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- **Ürün Kataloğu** - Kategorilere göre organize edilmiş ürünler
- **Gelişmiş Arama** - Ürün adı ve kategoriye göre arama
- **Filtreleme ve Sıralama** - Fiyat ve puana göre sıralama
- **Sepet Sistemi** - Ürün ekleme, çıkarma ve miktar güncelleme
- **Ürün Detay Sayfası** - Modal ile detaylı ürün bilgileri
- **Kullanıcı Girişi** - Modal tabanlı giriş sistemi

### Teknik Özellikler
- Vanilla JavaScript (Framework kullanılmamıştır)
- CSS Grid ve Flexbox ile modern layout
- Font Awesome ikonları
- Smooth animasyonlar ve geçişler
- Local storage desteği (sepet verileri)
- ESC tuşu ile modal kapatma
- Keyboard navigation desteği

## 📁 Proje Yapısı

```
trendyol-clone/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri
├── script.js           # JavaScript fonksiyonları
└── README.md           # Proje dokümantasyonu
```

## 🛠️ Kurulum

1. Proje dosyalarını bilgisayarınıza indirin
2. `index.html` dosyasını web tarayıcınızda açın
3. Site kullanıma hazır!

```bash
# Proje klasörüne gidin
cd trendyol-clone

# Dosyaları bir web sunucusu ile çalıştırmak için (opsiyonel)
python -m http.server 8000
# veya
npx serve .
```

## 🎯 Kullanım

### Ürün Arama ve Filtreleme
- Üst kısımdaki arama çubuğunu kullanarak ürün arayabilirsiniz
- Kategorilere tıklayarak filtreleme yapabilirsiniz
- Sıralama dropdown'ından fiyat veya puana göre sıralayabilirsiniz

### Sepet İşlemleri
- Ürün kartlarındaki "Sepete Ekle" butonuna tıklayın
- Sağ üst köşedeki sepet ikonuna tıklayarak sepeti görüntüleyin
- Sepette miktar artırma/azaltma ve ürün silme işlemleri yapabilirsiniz

### Ürün Detayları
- Herhangi bir ürün kartına tıklayarak detay sayfasını açabilirsiniz
- Modal pencerede ürün bilgilerini görüntüleyebilirsiniz

## 📱 Responsive Tasarım

Site aşağıdaki ekran boyutları için optimize edilmiştir:
- **Desktop**: 1200px ve üzeri
- **Tablet**: 768px - 1199px
- **Mobile**: 767px ve altı

## 🎨 Renk Paleti

- **Ana Renk**: #ff6b35 (Turuncu)
- **İkincil Renk**: #f7931e (Açık Turuncu)
- **Metin**: #333333 (Koyu Gri)
- **Arka Plan**: #f8f9fa (Açık Gri)
- **Beyaz**: #ffffff

## 🔧 Özelleştirme

### Yeni Ürün Ekleme
`script.js` dosyasındaki `products` dizisine yeni ürün ekleyebilirsiniz:

```javascript
{
    id: 13,
    title: "Yeni Ürün",
    price: 299,
    category: "kategori",
    rating: 4.5,
    reviews: 100,
    image: "🎁",
    description: "Ürün açıklaması"
}
```

### Yeni Kategori Ekleme
1. HTML'de navbar kısmına yeni kategori linkini ekleyin
2. CSS'de gerekli stilleri ekleyin
3. JavaScript'te kategori filtreleme fonksiyonunu güncelleyin

## 🌟 Gelecek Geliştirmeler

- [ ] Kullanıcı kayıt sistemi
- [ ] Ürün yorumları ve değerlendirmeler
- [ ] Favoriler sistemi
- [ ] Ödeme entegrasyonu
- [ ] Admin paneli
- [ ] Çoklu dil desteği
- [ ] Dark mode
- [ ] PWA (Progressive Web App) desteği

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorularınız için GitHub Issues kullanabilirsiniz.

---

**TrendyShop** - Modern E-Ticaret Deneyimi 🛍️
