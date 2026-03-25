import Array "mo:base/Array";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Map "mo:core/Map";
import List "mo:core/List";

actor {

  // ── Legacy types (kept verbatim from previous version for upgrade compatibility) ──

  type LegacyProductId = Nat;
  type LegacySessionId = Text;
  type LegacySkuId     = Text;
  type LegacyQuantity  = Nat;

  type LegacyProductCategory = {
    #sneakers;
    #boots;
    #sandals;
    #heels;
    #formal;
  };

  type LegacySku = {
    id    : LegacySkuId;
    size  : Nat;
    stock : Nat;
  };

  type LegacyProduct = {
    id          : LegacyProductId;
    name        : Text;
    description : Text;
    price       : Nat;
    category    : LegacyProductCategory;
    imageUrl    : Text;
    sizes       : [LegacySku];
  };

  type LegacyCartItem = {
    productId : LegacyProductId;
    skuId     : LegacySkuId;
    quantity  : LegacyQuantity;
  };

  type LegacyShippingAddress = {
    name       : Text;
    street     : Text;
    city       : Text;
    postalCode : Text;
    country    : Text;
  };

  type LegacyOrder = {
    id              : Nat;
    user            : Principal;
    items           : [LegacyCartItem];
    shippingAddress : LegacyShippingAddress;
    totalPrice      : Nat;
    orderTime       : Nat;
  };

  // ── Legacy stable storage – preserved so the upgrade compiler does not drop them ──
  let products     = Map.empty<LegacyProductId, LegacyProduct>();
  let carts        = Map.empty<LegacySessionId, List.List<LegacyCartItem>>();
  let orders = Map.empty<Nat, LegacyOrder>();
  var nextProductId : Nat = 0;

  // ── New types ──

  type CartItem = {
    productId : Nat;
    size      : Nat;
    quantity  : Nat;
  };

  type Product = {
    id              : Nat;
    name            : Text;
    category        : Text;
    displayCategory : Text;
    price           : Float;
    sizes           : [Nat];
    rating          : Float;
    reviews         : Nat;
    description     : Text;
    features        : [Text];
    badge           : ?Text;
    imageUrl        : Text;
  };

  type Order = {
    id              : Nat;
    items           : [CartItem];
    shippingName    : Text;
    shippingEmail   : Text;
    shippingAddress : Text;
    shippingCity    : Text;
    shippingZip     : Text;
    shippingCountry : Text;
    totalPrice      : Float;
    createdAt       : Int;
  };

  // ── New stable storage ──
  stable var ordersList  : [Order] = [];
  stable var nextOrderId : Nat = 1;

  // ── Seed data ──

  let seedProducts : [Product] = [
    {
      id = 1; name = "Sprint X Pro"; category = "sneakers"; displayCategory = "Running";
      price = 129.99; sizes = [7, 8, 9, 10, 11, 12]; rating = 4.8; reviews = 142;
      description = "The Sprint X Pro is engineered for elite performance. Its lightweight frame and responsive cushioning make every stride feel effortless.";
      features = ["Responsive foam midsole", "Breathable mesh upper", "Reflective details", "Rubber outsole with grip zones"];
      badge = ?"Best Seller"; imageUrl = "/assets/generated/shoe-sprint-x-pro.dim_600x600.png";
    },
    {
      id = 2; name = "Codeathon Elite"; category = "sneakers"; displayCategory = "Training";
      price = 149.99; sizes = [7, 8, 9, 10, 11, 12, 13]; rating = 4.9; reviews = 98;
      description = "The Codeathon Elite is built for champions of the 2K26 season. Cross-training perfection with unparalleled support and style.";
      features = ["Multi-directional traction", "Adaptive lacing system", "Codeathon 2K26 edition", "Reinforced heel counter"];
      badge = ?"New"; imageUrl = "/assets/generated/shoe-codeathon-elite.dim_600x600.png";
    },
    {
      id = 3; name = "Lock Step 2K"; category = "sneakers"; displayCategory = "Lifestyle";
      price = 109.99; sizes = [6, 7, 8, 9, 10, 11]; rating = 4.6; reviews = 67;
      description = "Street-ready style meets technical precision. The Lock Step 2K features a puzzle-piece outsole pattern that grips any surface.";
      features = ["Puzzle-piece grip outsole", "Premium canvas upper", "Memory foam insole", "Lifestyle design"];
      badge = null; imageUrl = "/assets/generated/shoe-lock-step-2k.dim_600x600.png";
    },
    {
      id = 4; name = "Rush Runner"; category = "sneakers"; displayCategory = "Basketball";
      price = 159.99; sizes = [8, 9, 10, 11, 12, 13]; rating = 4.7; reviews = 203;
      description = "Dominate the court with the Rush Runner. High-top design for superior ankle support and explosive court performance.";
      features = ["High-top ankle support", "Cushioned collar", "Pivot zones on outsole", "Quick-lace system"];
      badge = ?"Hot"; imageUrl = "/assets/generated/shoe-rush-runner.dim_600x600.png";
    },
    {
      id = 5; name = "Key Stride Oxford"; category = "formal"; displayCategory = "Formal";
      price = 189.99; sizes = [7, 8, 9, 10, 11]; rating = 4.5; reviews = 45;
      description = "Unlock professional elegance with the Key Stride Oxford. Premium leather craftsmanship meets modern design sensibility.";
      features = ["Full-grain leather upper", "Leather sole", "Cushioned footbed", "Goodyear welt construction"];
      badge = null; imageUrl = "/assets/generated/shoe-key-stride.dim_600x600.png";
    },
    {
      id = 6; name = "Puzzle Pace"; category = "sneakers"; displayCategory = "Lifestyle";
      price = 99.99; sizes = [6, 7, 8, 9, 10, 11, 12]; rating = 4.4; reviews = 81;
      description = "Every piece fits. The Puzzle Pace features unique interlocking sole panels for dynamic traction and iconic street style.";
      features = ["Interlocking outsole design", "Canvas and suede upper", "Gel heel cushioning", "Pull-on loop"];
      badge = null; imageUrl = "/assets/generated/shoe-puzzle-pace.dim_600x600.png";
    },
    {
      id = 7; name = "Cipher Boot"; category = "boots"; displayCategory = "Boots";
      price = 219.99; sizes = [7, 8, 9, 10, 11, 12]; rating = 4.8; reviews = 37;
      description = "Crack the code of style with the Cipher Boot. All-terrain performance meets urban sophistication in this premium ankle boot.";
      features = ["Waterproof upper", "Vibram outsole", "Side zip closure", "Padded ankle collar"];
      badge = ?"Premium"; imageUrl = "/assets/generated/shoe-cipher-boot.dim_600x600.png";
    },
    {
      id = 8; name = "Rush Trainer X"; category = "sneakers"; displayCategory = "Training";
      price = 119.99; sizes = [7, 8, 9, 10, 11, 12, 13]; rating = 4.6; reviews = 156;
      description = "Built for the grind. The Rush Trainer X delivers gym-to-street versatility with advanced cushioning technology.";
      features = ["Dual-density foam", "Flat heel for lifting", "Breathable knit upper", "Durable outsole"];
      badge = null; imageUrl = "/assets/generated/shoe-rush-trainer.dim_600x600.png";
    },
    {
      id = 9; name = "Nexus Glide"; category = "sneakers"; displayCategory = "Running";
      price = 139.99; sizes = [7, 8, 9, 10, 11]; rating = 4.7; reviews = 89;
      description = "Smooth transitions and cloud-like comfort define the Nexus Glide. Perfect for long-distance runners seeking efficiency.";
      features = ["Rocker geometry sole", "Energy-return foam", "Seamless upper", "Wide toe box"];
      badge = null; imageUrl = "/assets/generated/shoe-sprint-x-pro.dim_600x600.png";
    },
    {
      id = 10; name = "Code Breaker Low"; category = "sneakers"; displayCategory = "Lifestyle";
      price = 89.99; sizes = [6, 7, 8, 9, 10, 11, 12]; rating = 4.3; reviews = 54;
      description = "Break the mold with the Code Breaker Low. Clean silhouette with hidden technical details for the discerning sneakerhead.";
      features = ["Vulcanized sole", "Premium leather", "Embossed logo", "OrthoLite insole"];
      badge = null; imageUrl = "/assets/generated/shoe-puzzle-pace.dim_600x600.png";
    },
    {
      id = 11; name = "Vertex Hoop Pro"; category = "sneakers"; displayCategory = "Basketball";
      price = 169.99; sizes = [8, 9, 10, 11, 12, 13]; rating = 4.9; reviews = 112;
      description = "The Vertex Hoop Pro gives you the edge on court. Zoom cushioning and lockdown fit for elite basketball performance.";
      features = ["Zoom Air unit", "Bootie upper construction", "Herringbone traction", "Foam collar"];
      badge = ?"New"; imageUrl = "/assets/generated/shoe-rush-runner.dim_600x600.png";
    },
    {
      id = 12; name = "Pinnacle Derby"; category = "formal"; displayCategory = "Formal";
      price = 209.99; sizes = [7, 8, 9, 10, 11, 12]; rating = 4.6; reviews = 29;
      description = "The Pinnacle Derby represents the summit of formal footwear. Handcrafted Italian leather with a modern athletic-inspired sole.";
      features = ["Handcrafted leather", "Cushioned latex insole", "Blake-stitched construction", "Low-profile rubber sole"];
      badge = null; imageUrl = "/assets/generated/shoe-key-stride.dim_600x600.png";
    },
  ];

  // ── Query functions ──

  public query func getAllProducts() : async [Product] {
    seedProducts
  };

  public query func getProduct(id : Nat) : async ?Product {
    Array.find<Product>(seedProducts, func(p) { p.id == id })
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    Array.filter<Product>(seedProducts, func(p) {
      p.category == category or p.displayCategory == category
    })
  };

  // ── Order management ──

  public func placeOrder(
    items           : [CartItem],
    shippingName    : Text,
    shippingEmail   : Text,
    shippingAddress : Text,
    shippingCity    : Text,
    shippingZip     : Text,
    shippingCountry : Text,
    totalPrice      : Float,
  ) : async Nat {
    let orderId = nextOrderId;
    let newOrder : Order = {
      id              = orderId;
      items;
      shippingName;
      shippingEmail;
      shippingAddress;
      shippingCity;
      shippingZip;
      shippingCountry;
      totalPrice;
      createdAt = Time.now();
    };
    ordersList    := Array.append(ordersList, [newOrder]);
    nextOrderId   += 1;
    orderId
  };

  public query func getOrder(id : Nat) : async ?Order {
    Array.find<Order>(ordersList, func(o) { o.id == id })
  };

  public query func getAllOrders() : async [Order] {
    ordersList
  };
};
