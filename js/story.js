/* ============================================================
   SoftZone — Scroll Storytelling Engine (js/story.js)
   ============================================================ */

window.SoftwareStore = window.SoftwareStore || {};

SoftwareStore.Story = (() => {
  
  // Interactive Orbit Node details mapping
  const NODE_DETAILS = {
    email: { 
      name: "Email Automation", 
      icon: "mail", 
      desc: "Tự động hóa toàn bộ quy trình gửi thư chăm sóc khách hàng, gửi email chào mừng và nuôi dưỡng leads tự động 24/7 theo kịch bản.", 
      tool: "EmailCraft Pro", 
      price: "$39/tháng", 
      productId: 12 
    },
    ai: { 
      name: "AI Processing Assistant", 
      icon: "brain", 
      desc: "Trích xuất dữ liệu, viết email nháp, tóm tắt nội dung và phân tích phản hồi của khách hàng tự động nhờ trợ lý AI thông minh.", 
      tool: "AI Content Flow", 
      price: "$49/tháng", 
      productId: 20 
    },
    database: { 
      name: "Database Sync Engine", 
      icon: "database", 
      desc: "Đồng bộ hóa dữ liệu thời gian thực giữa CRM, các bảng tính Excel và nguồn API bên thứ ba, bảo mật dữ liệu tuyệt đối.", 
      tool: "DataVault Pro", 
      price: "$59/tháng", 
      productId: 9 
    },
    crm: { 
      name: "Smart CRM System", 
      icon: "users", 
      desc: "Tự động thu thập lead từ web form, phân loại phễu tiềm năng và chia việc cho nhân viên kinh doanh ngay khi có khách đăng ký.", 
      tool: "CRM Automation Pro", 
      price: "$69/tháng", 
      productId: 21 
    },
    social: { 
      name: "Social Scheduler", 
      icon: "share-2", 
      desc: "Lên lịch bài đăng đa kênh (Facebook, LinkedIn, TikTok), tự động phân tích tương tác và trả lời comment khách hàng bằng AI.", 
      tool: "Social Auto Manager", 
      price: "$29/tháng", 
      productId: 22 
    },
    analytics: { 
      name: "Smart Analytics AI", 
      icon: "bar-chart-3", 
      desc: "Tổng hợp dữ liệu kinh doanh đa nguồn, tự động tạo dashboard trực quan và báo cáo tiến độ, dự toán doanh số bằng AI.", 
      tool: "SmartAnalytics AI", 
      price: "$49/tháng", 
      productId: 15 
    }
  };

  // Calculate local progress ranges dynamically for the 7 scenes
  const scenesConfig = [
    { id: "scene-1", length: 1.8, label: "01 Khởi động" },
    { id: "scene-2", length: 1.5, label: "02 Vấn đề" },
    { id: "scene-3", length: 1.8, label: "03 Workflow" },
    { id: "scene-4", length: 1.5, label: "04 Kết nối" },
    { id: "scene-5", length: 1.6, label: "05 AI" },
    { id: "scene-6", length: 2.2, label: "06 Playground" },
    { id: "scene-7", length: 1.8, label: "07 Cửa hàng" }
  ];

  let totalLength = scenesConfig.reduce((sum, s) => sum + s.length, 0);
  let currentStart = 0;
  scenesConfig.forEach(s => {
    s.start = currentStart / totalLength;
    s.end = (currentStart + s.length) / totalLength;
    currentStart += s.length;
  });

  // Render the HTML structure for the entire scroll stage
  function render() {
    const { Data, Components } = SoftwareStore;
    
    // Featured product for Scene 7 (CRM Automation Pro)
    const featuredProduct = Data.products.find(p => p.id === 21) || Data.products[0];
    const proPlan = featuredProduct.plans.find(p => p.type === 'pro') || featuredProduct.plans[0];
    const hasDiscount = featuredProduct.discount && featuredProduct.discount > 0;
    const discountedPrice = hasDiscount ? proPlan.price * (1 - featuredProduct.discount / 100) : proPlan.price;
    const statsList = Data.stats || [];

    return `
      <div class="automation-story" id="automation-story-trigger">
        <div class="automation-stage">
          
          <!-- MOBILE TOP PROGRESS BAR -->
          <div class="story-progress-mobile">
            <div class="story-progress-mobile-bar" id="story-progress-mobile-bar"></div>
          </div>

          <!-- DESKTOP SIDE DOT INDICATOR -->
          <div class="story-progress">
            ${scenesConfig.map(s => `
              <div class="progress-dot-wrapper" data-scene-id="${s.id}" onclick="SoftwareStore.Story.scrollToProgress(${s.start})">
                <span class="progress-dot-label">${s.label}</span>
                <span class="progress-dot"></span>
              </div>
            `).join('')}
          </div>

          <!-- LỚP HẬU CẢNH (Background, Grid, Nebula Fog) -->
          <div class="stage-layer layer--bg">
            <div class="digital-grid" id="story-grid"></div>
            <div class="hologram-fog"></div>
            <div class="blur-dot blur-dot--purple" style="top: 20%; left: 15%;"></div>
            <div class="blur-dot blur-dot--cyan" style="bottom: 15%; right: 10%;"></div>
          </div>
          
          <!-- LỚP KHÔNG KHÍ (Ambient overlays, scanlines) -->
          <div class="stage-layer layer--particles">
            <div class="scanlines"></div>
          </div>

          <!-- LỚP VẬT THỂ XA (Tiny dashboards, background clouds) -->
          <div class="stage-layer layer--far" id="layer-far">
            <div class="parallax-item" style="top: 15%; right: 25%; opacity: 0.15; transform: scale(0.6);">
              <i data-lucide="cloud" style="width: 80px; height: 80px; color: var(--cyan);"></i>
            </div>
            <div class="parallax-item" style="bottom: 25%; left: 12%; opacity: 0.15; transform: scale(0.7);">
              <i data-lucide="database" style="width: 60px; height: 60px; color: var(--purple-light);"></i>
            </div>
          </div>

          <!-- LỚP TRUNG CẢNH (Scenes and Content) -->
          <div class="stage-layer layer--mid">
            
            <!-- CẢNH 1 — HERO KHỞI ĐỘNG HỆ THỐNG (Asymmetric) -->
            <div class="story-scene story-scene--1 scene--split active" id="scene-1">
              <div class="scene-text">
                <span class="scene-label">AI & AUTOMATION SOFTWARE MARKETPLACE</span>
                <h1 class="hero-title">
                  <span>Tự động hóa công việc.</span><br>
                  <span class="text-gradient">Mở rộng mọi khả năng.</span>
                </h1>
                <p class="scene-description">Khám phá các tool AI và phần mềm tự động hóa giúp bạn giảm thao tác lặp lại, tiết kiệm thời gian và vận hành hiệu quả hơn.</p>
                <div class="final-cta">
                  <a href="#/store" class="btn btn--primary btn--lg">
                    <i data-lucide="compass"></i> Khám phá công cụ
                  </a>
                  <button class="btn btn--outline btn--lg" onclick="SoftwareStore.Story.scrollToPlayground()">
                    <i data-lucide="play-circle"></i> Trải nghiệm Automation
                  </button>
                </div>
                <div class="hero-stats">
                  ${statsList.map(st => `
                    <div class="hero-stat-item">
                      <strong class="stat-num">${st.value}</strong>
                      <span class="stat-label">${st.label}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
              <div class="scene-visual"></div>
            </div>

            <!-- CẢNH 2 — CÔNG VIỆC THỦ CÔNG HỖN LOẠN (Chaos Cards) -->
            <div class="story-scene story-scene--2 scene--split" id="scene-2">
              <div class="scene-text">
                <span class="scene-label">Quá tải quy trình thủ công</span>
                <h2 class="scene-title">Bạn đang dành quá nhiều thời gian<br><span>cho những việc có thể tự động hóa.</span></h2>
                <p class="scene-description">Email, dữ liệu, báo cáo và phản hồi khách hàng có thể được xử lý tự động trong một quy trình thống nhất mà không cần thao tác thủ công từng bước.</p>
              </div>
              
              <div class="scene-visual">
                <div class="chaos-container">
                  <div class="task-card task-card--crm" style="left: 10%; top: 12%;">
                    <div class="task-card__icon"><i data-lucide="users"></i></div>
                    <div class="task-card__content">
                      <span class="task-card__title">Lead Form đăng ký</span>
                      <div class="task-card__status"><span class="task-card__status-dot"></span> Đang chờ xử lý...</div>
                    </div>
                  </div>
                  <div class="task-card task-card--email" style="left: 45%; top: 38%;">
                    <div class="task-card__icon"><i data-lucide="mail"></i></div>
                    <div class="task-card__content">
                      <span class="task-card__title">Gửi mail tư vấn tay</span>
                      <div class="task-card__status"><span class="task-card__status-dot" style="animation: pulse 1.5s infinite"></span> Đang soạn thảo...</div>
                    </div>
                  </div>
                  <div class="task-card task-card--sheet" style="left: 12%; top: 62%;">
                    <div class="task-card__icon"><i data-lucide="file-text"></i></div>
                    <div class="task-card__content">
                      <span class="task-card__title">Nhập tay báo cáo ngày</span>
                      <div class="task-card__status"><span class="task-card__status-dot"></span> Chưa đồng bộ</div>
                    </div>
                  </div>
                  <div class="task-card task-card--alert" style="left: 50%; top: 10%;">
                    <div class="task-card__icon"><i data-lucide="alert-triangle"></i></div>
                    <div class="task-card__content">
                      <span class="task-card__title">Cảnh báo: 52 leads tồn</span>
                      <div class="task-card__status"><span class="task-card__status-dot"></span> Hệ thống quá tải</div>
                    </div>
                  </div>
                  <div class="task-card task-card--cal" style="left: 42%; top: 65%;">
                    <div class="task-card__icon"><i data-lucide="calendar"></i></div>
                    <div class="task-card__content">
                      <span class="task-card__title">Lên lịch họp thủ công</span>
                      <div class="task-card__status"><span class="task-card__status-dot"></span> Trùng lịch hẹn</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- CẢNH 3 — WORKFLOW TỰ ĐỘNG (Full Screen Horizontal) -->
            <div class="story-scene story-scene--3 scene--center" id="scene-3">
              <div class="scene-text">
                <span class="scene-label">Sắp xếp hệ thống</span>
                <h2 class="scene-title">Thiết lập một lần.<br><span>Hệ thống vận hành liên tục.</span></h2>
                <p class="scene-description">Kết nối các ứng dụng và biến quy trình thủ công thành chuỗi tự động hóa hoạt động trơn tru 24/7.</p>
              </div>

              <div class="flow-container">
                <svg class="flow-svg-overlay">
                  <path id="flow-line-1" class="flow-connection-line" d="M 85,42.5 L 290,42.5" />
                  <path id="flow-pulse-1" class="flow-connection-pulse" d="M 85,42.5 L 290,42.5" />
                  
                  <path id="flow-line-2" class="flow-connection-line" d="M 375,42.5 L 580,42.5" />
                  <path id="flow-pulse-2" class="flow-connection-pulse" d="M 375,42.5 L 580,42.5" />
                  
                  <path id="flow-line-3" class="flow-connection-line" d="M 665,42.5 L 815,42.5" />
                  <path id="flow-pulse-3" class="flow-connection-pulse" d="M 665,42.5 L 815,42.5" />
                </svg>

                <div class="flow-node" id="node-trigger-1">
                  <i data-lucide="file-text"></i>
                  <span class="flow-node__label">Khách gửi Form</span>
                </div>
                <div class="flow-node" id="node-ai-1">
                  <i data-lucide="brain"></i>
                  <span class="flow-node__label">AI Phân Tích</span>
                </div>
                <div class="flow-node" id="node-crm-1">
                  <i data-lucide="database"></i>
                  <span class="flow-node__label">Cập nhật CRM</span>
                </div>
                <div class="flow-node" id="node-mail-1">
                  <i data-lucide="send"></i>
                  <span class="flow-node__label">Gửi Email Tự Động</span>
                </div>
              </div>
            </div>

            <!-- CẢNH 4 — KẾT NỐI HỆ SINH THÁI (Asymmetric Reverse) -->
            <div class="story-scene story-scene--4 scene--split-rev" id="scene-4">
              <div class="scene-text">
                <span class="scene-label">Tích hợp đa nền tảng</span>
                <h2 class="scene-title">Kết nối mọi công cụ<br><span>trong một hệ sinh thái.</span></h2>
                <p class="scene-description">Đồng bộ dữ liệu, điều khiển quy trình và quản lý nhiều nền tảng từ một hệ thống thống nhất.</p>
              </div>

              <div class="scene-visual">
                <div class="ecosystem-container" id="ecosystem-net">
                  <div class="eco-app" id="eco-app-1" style="transform: translate(-50%, -50%);"><i data-lucide="mail"></i></div>
                  <div class="eco-app" id="eco-app-2" style="transform: translate(-50%, -50%);"><i data-lucide="slack"></i></div>
                  <div class="eco-app" id="eco-app-3" style="transform: translate(-50%, -50%);"><i data-lucide="chrome"></i></div>
                  <div class="eco-app" id="eco-app-4" style="transform: translate(-50%, -50%);"><i data-lucide="database"></i></div>
                  <div class="eco-app" id="eco-app-5" style="transform: translate(-50%, -50%);"><i data-lucide="message-square"></i></div>
                  <div class="eco-app" id="eco-app-6" style="transform: translate(-50%, -50%);"><i data-lucide="globe"></i></div>
                </div>
              </div>
            </div>

            <!-- CẢNH 5 — AI XỬ LÝ DỮ LIỆU (Asymmetric) -->
            <div class="story-scene story-scene--5 scene--split" id="scene-5">
              <div class="scene-text">
                <span class="scene-label">Trợ lý AI tự động</span>
                <h2 class="scene-title">AI không chỉ hỗ trợ.<br><span>AI có thể làm việc cùng bạn.</span></h2>
                <p class="scene-description">Giao việc cho AI, hệ thống tự động suy luận, trích xuất dữ liệu, viết bản nháp và tạo chuỗi hành động tối ưu.</p>
              </div>

              <div class="scene-visual" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div class="prompt-box">
                  <i class="prompt-icon" data-lucide="sparkles"></i>
                  <div class="prompt-text" id="prompt-typing-text"></div>
                </div>

                <div class="ai-output-cards">
                  <div class="ai-card" id="ai-card-1">
                    <i data-lucide="pie-chart" style="color: var(--cyan)"></i>
                    <div class="ai-card__title">Phân tích Lead</div>
                  </div>
                  <div class="ai-card" id="ai-card-2">
                    <i data-lucide="pen-tool" style="color: var(--purple-light)"></i>
                    <div class="ai-card__title">Viết Mail Draft</div>
                  </div>
                  <div class="ai-card" id="ai-card-3">
                    <i data-lucide="check-square" style="color: var(--green)"></i>
                    <div class="ai-card__title">Tạo Task CRM</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- CẢNH 6 — AUTOMATION PLAYGROUND (Full Screen Interactive) -->
            <div class="story-scene story-scene--6 scene--center" id="scene-6">
              <div class="scene-text">
                <span class="scene-label">Sân chơi tự động hóa</span>
                <h2 class="scene-title">SoftZone <span>Automation Playground</span></h2>
                <p class="scene-description" style="max-width: 720px;">Trực tiếp kéo, thả, chỉnh sửa cấu hình các Node và bấm chạy thử workflow tự động hóa của riêng bạn.</p>
              </div>
              
              <!-- Container Playground sẽ được inject qua js/playground.js -->
              <div id="playground-viewport" style="width: 100%; display: flex; justify-content: center; transform: translateY(40px); opacity: 0; pointer-events: auto;"></div>
            </div>

            <!-- CẢNH 7 — SẢN PHẨM NỔI BẬT & MARKETPLACE (Asymmetric reverse) -->
            <div class="story-scene story-scene--7 scene--split-rev" id="scene-7">
              <div class="scene-text">
                <span class="scene-label">Sản phẩm khuyên dùng</span>
                <h2 class="scene-title">Khám phá giải pháp<br><span>CRM Automation Pro</span></h2>
                <p class="scene-description">Bản quyền phần mềm CRM tích hợp AI, tự động kết nối leads, phân việc cho sale và gửi tin chăm sóc khách hàng tự động 24/7.</p>
                
                <!-- Category Grid links -->
                <div class="grid-transition-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 1rem; pointer-events: auto;">
                  <a href="#/store" class="grid-node-card" style="padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02); display: flex; align-items: center; gap: 8px;">
                    <div class="grid-node-card__icon" style="width:30px; height:30px; border-radius:6px; color: var(--cyan); background:rgba(34, 211, 238, 0.1); font-size:1rem;"><i data-lucide="zap" style="width:16px;"></i></div>
                    <span class="grid-node-card__name" style="font-size:0.75rem;">Workflow Auto</span>
                  </a>
                  <a href="#/store" class="grid-node-card" style="padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02); display: flex; align-items: center; gap: 8px;">
                    <div class="grid-node-card__icon" style="width:30px; height:30px; border-radius:6px; color: var(--purple-light); background:rgba(168, 85, 247, 0.1); font-size:1rem;"><i data-lucide="brain" style="width:16px;"></i></div>
                    <span class="grid-node-card__name" style="font-size:0.75rem;">AI & Copilots</span>
                  </a>
                </div>
              </div>
              
              <div class="scene-visual">
                <div class="featured-showcase-container">
                  <div class="showcase-left">
                    <div class="product-card" style="border: 1px solid var(--border-active); background: rgba(14,10,28,0.9); box-shadow: var(--glow-purple); margin: 0;">
                      <div class="product-card__image" style="background: linear-gradient(135deg, ${featuredProduct.color}20, ${featuredProduct.color}50); height: 160px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
                        <span class="product-card__icon" style="font-size: 3.5rem;">
                          <i data-lucide="users" style="width: 60px; height: 60px; color: var(--cyan)"></i>
                        </span>
                        <span class="badge badge--danger" style="position: absolute; top: 12px; left: 12px;">Đề xuất</span>
                        <span class="product-card__wishlist" data-action="toggleWishlist" data-product-id="${featuredProduct.id}">
                          <i data-lucide="heart"></i>
                        </span>
                      </div>
                      <div class="product-card__body" style="padding: 15px;">
                        <span class="product-card__category" style="font-size:0.7rem;">Doanh nghiệp & Tự động hóa</span>
                        <h3 class="product-card__title" style="font-size:1.05rem; margin-top:2px;">${featuredProduct.name}</h3>
                        <p class="product-card__desc" style="font-size:0.75rem; margin-bottom:8px;">${featuredProduct.shortDesc}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="showcase-right">
                    <div class="pricing-card pricing-card--popular" style="margin: 0; background: rgba(16, 11, 30, 0.9); border-color: var(--cyan); box-shadow: var(--glow-cyan); padding: 20px 15px;">
                      <span class="pricing-card__badge" style="background: var(--cyan); color: #080512; font-size:0.65rem; padding: 2px 8px;">🔥 Bản quyền Pro</span>
                      <div class="pricing-card__header" style="margin-bottom: 12px;">
                        <h3 class="pricing-card__name" style="font-size:1rem;">Gói ${proPlan.name}</h3>
                        <div class="pricing-card__price" style="margin-top:4px;">
                          ${hasDiscount ? `<span class="pricing-card__original" style="font-size:0.8rem;">${SoftwareStore.Utils.formatCurrency(proPlan.price)}</span>` : ''}
                          <span class="pricing-card__amount" style="color: var(--cyan); font-size:1.6rem; font-weight:700;">${SoftwareStore.Utils.formatCurrency(discountedPrice)}</span>
                          <span class="pricing-card__period" style="font-size:0.75rem;">/ tháng</span>
                        </div>
                      </div>
                      <button class="btn btn--primary pricing-card__action" style="background: var(--cyan); color: #080512; border: none; width: 100%; padding: 8px 16px; font-size:0.8rem; font-weight:600;"
                        data-action="addToCart" data-product-id="${featuredProduct.id}" data-plan="${proPlan.type}">
                        Mua Ngay Bản Quyền
                      </button>
                      <button class="btn btn--ghost" onclick="SoftwareStore.Story.tryProductInPlayground(${featuredProduct.id})" style="width: 100%; margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-white-secondary); padding: 6px;">
                        <i data-lucide="play" style="width: 12px; margin-right:4px; display:inline-block; vertical-align:middle;"></i> Thử trong Playground
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- LỚP TIỀN CẢNH (Automation Core floating on top, transforming dynamically) -->
          <div class="stage-layer layer--core" id="layer-core">
            <div class="core-scroll-layer" id="stage-core-scroll">
              <div class="core-floating-layer">
                <div class="core-mouse-layer" id="stage-core-mouse">
                  <div class="automation-core" id="stage-core">
                    <div class="core-glow"></div>
                    <div class="core-ring"></div>
                    <div class="core-ring core-ring--inner"></div>
                    <div class="core-center" id="core-icon" data-current-icon="cpu">
                      <i data-lucide="cpu" style="width: 50%; height: 50%; color: #fff;"></i>
                    </div>

                    <!-- Orbiting Interactive Nodes -->
                    <div class="core-node" data-node="email" style="--angle: 0deg;">
                      <i data-lucide="mail"></i>
                      <span class="core-node-tooltip">Email Auto</span>
                    </div>
                    <div class="core-node" data-node="ai" style="--angle: 60deg;">
                      <i data-lucide="brain"></i>
                      <span class="core-node-tooltip">AI Processor</span>
                    </div>
                    <div class="core-node" data-node="database" style="--angle: 120deg;">
                      <i data-lucide="database"></i>
                      <span class="core-node-tooltip">Database Sync</span>
                    </div>
                    <div class="core-node" data-node="crm" style="--angle: 180deg;">
                      <i data-lucide="users"></i>
                      <span class="core-node-tooltip">Smart CRM</span>
                    </div>
                    <div class="core-node" data-node="social" style="--angle: 240deg;">
                      <i data-lucide="share-2"></i>
                      <span class="core-node-tooltip">Social Auto</span>
                    </div>
                    <div class="core-node" data-node="analytics" style="--angle: 300deg;">
                      <i data-lucide="bar-chart-3"></i>
                      <span class="core-node-tooltip">AI Analytics</span>
                    </div>

                    <!-- Orbit dashed visual path (SVG) -->
                    <svg class="core-svg-lines">
                      <circle cx="50%" cy="50%" r="45%" class="orbit-path" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ORBIT NODE DETAIL SLIDE-OUT PANEL -->
          <div class="core-detail-panel" id="core-detail-panel"></div>

          <!-- LỚP CẬN CẢNH (Floating blur overlay or code panels floating by camera) -->
          <div class="stage-layer layer--near" id="layer-near">
            <div class="parallax-item" style="top: 70%; left: -5%; opacity: 0.15; transform: rotate(15deg) scale(1.1); filter: blur(2px);">
              <pre style="color: var(--cyan); font-family: monospace; font-size: 0.8rem;">
const core = new AICore();
core.init({
  mode: 'autonomous',
  optimize: true
});
              </pre>
            </div>
            <div class="parallax-item" style="top: 10%; right: -5%; opacity: 0.12; transform: rotate(-10deg) scale(0.95); filter: blur(3px);">
              <pre style="color: var(--purple-light); font-family: monospace; font-size: 0.75rem;">
{"event": "lead_created",
 "data": {
   "id": "ld_9981",
   "name": "Alex",
   "score": 92
 }}
              </pre>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // Linear mapping math helper
  function mapRange(value, inMin, inMax, outMin, outMax) {
    const progress = Math.min(Math.max((value - inMin) / (inMax - inMin), 0), 1);
    return outMin + (outMax - outMin) * progress;
  }

  // Opacity calculations for hold scene effect
  function getSceneOpacity(p) {
    if (p < 0.18) {
      return mapRange(p, 0, 0.18, 0, 1);
    }
    if (p <= 0.82) {
      return 1;
    }
    return mapRange(p, 0.82, 1, 1, 0);
  }

  // Blur calculations for hold scene effect
  function getSceneBlur(p) {
    if (p < 0.12) {
      return mapRange(p, 0, 0.12, 8, 0);
    }
    if (p <= 0.86) {
      return 0;
    }
    return mapRange(p, 0.86, 1, 0, 6);
  }

  // TranslateY calculations for hold scene effect
  function getSceneY(p) {
    if (p < 0.18) {
      return mapRange(p, 0, 0.18, 40, 0);
    }
    if (p <= 0.72) {
      return 0;
    }
    return mapRange(p, 0.72, 1, 0, -30);
  }

  // Scale calculations for hold scene effect
  function getSceneScale(p) {
    if (p < 0.18) {
      return mapRange(p, 0, 0.18, 0.97, 1);
    }
    return 1;
  }

  // Setup GSAP Timeline and ScrollTrigger linking
  function initScrollAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn("GSAP or ScrollTrigger is not loaded. Cinematic scroll is disabled.");
      return;
    }
    
    // Register scrolltrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // ============================================================
    // INTERACTIVE MOUSE PARALLAX BACKDROP
    // ============================================================
    const stage = document.querySelector(".automation-stage");
    const mouseLayer = document.getElementById("stage-core-mouse");
    if (stage && mouseLayer && !isMobile) {
      stage.addEventListener("mousemove", (e) => {
        const rect = stage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // Range: -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Shift core and ambient elements dynamically
        gsap.to(mouseLayer, { x: x * 10, y: y * 10, duration: 0.8, ease: "power1.out" });
        gsap.to("#story-grid", { x: x * 20, y: y * 20, duration: 0.8, ease: "power1.out" });
        gsap.to(".hologram-fog", { x: -x * 25, y: -y * 25, duration: 1.0, ease: "power1.out" });
        gsap.to(".blur-dot--purple", { x: x * 40, y: y * 40, duration: 1.2, ease: "power1.out" });
        gsap.to(".blur-dot--cyan", { x: -x * 45, y: -y * 45, duration: 1.2, ease: "power1.out" });
        gsap.to("#layer-near", { x: x * 15, y: y * 15, duration: 0.8, ease: "power1.out" });
      });
    }

    // Close details panel when clicking outside
    if (stage) {
      stage.addEventListener("click", () => {
        closeDetailPanel();
      });
    }

    // Disable default mobile transitions if requested reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // ============================================================
    // DYNAMIC GSAP SCROLLTIMELINE CONFIGURATION (Match Media)
    // ============================================================
    const mm = gsap.matchMedia();
    
    // 1. DESKTOP ANIMATIONS
    mm.add("(min-width: 1025px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#automation-story-trigger",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: false,
          onUpdate: (self) => {
            updateSceneVisibility(self.progress);
          }
        }
      });

      // Scene 1 -> 2 (Hero to Chaos)
      tl.set("#stage-core-scroll", { x: "20vw", y: "0vh", scale: 1, opacity: 1 });
      
      const taskCards = document.querySelectorAll(".task-card");
      if (taskCards.length >= 5) {
        tl.fromTo(taskCards[0], { x: -350, y: -200, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, 0.2);
        tl.fromTo(taskCards[1], { x: 350, y: 150, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, 0.4);
        tl.fromTo(taskCards[2], { x: -350, y: 200, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, 0.6);
        tl.fromTo(taskCards[3], { x: 300, y: -200, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, 0.8);
        tl.fromTo(taskCards[4], { x: -100, y: 300, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, 1.0);
      }
      tl.to("#stage-core-scroll", { scale: 0.9, duration: 2 }, 0);
      tl.to({}, { duration: 3.5 }); // HOLD SCENE 2

      // Scene 2 -> 3 (Chaos to Workflow)
      tl.to("#stage-core-scroll", { x: "0vw", y: "24vh", scale: 0.48, opacity: 0.16, duration: 2.5 });
      if (taskCards.length >= 5) {
        tl.to(taskCards, { scale: 0.4, opacity: 0, duration: 2 }, "<");
      }

      const flowNodes = document.querySelectorAll(".flow-node");
      flowNodes.forEach((node, idx) => {
        tl.fromTo(node, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 }, `<${idx * 0.4}`);
      });
      tl.fromTo("#flow-pulse-1", { strokeDashoffset: 120 }, { strokeDashoffset: 0, duration: 1.5 });
      tl.fromTo("#flow-pulse-2", { strokeDashoffset: 120 }, { strokeDashoffset: 0, duration: 1.5 }, "<0.8");
      tl.fromTo("#flow-pulse-3", { strokeDashoffset: 120 }, { strokeDashoffset: 0, duration: 1.5 }, "<0.8");
      tl.to({}, { duration: 3.5 }); // HOLD SCENE 3

      // Scene 3 -> 4 (Workflow to Ecosystem)
      tl.to("#stage-core-scroll", { x: "-20vw", y: "0vh", scale: 1, opacity: 1, duration: 2.5 });
      tl.to(flowNodes, { scale: 0.3, opacity: 0, duration: 2 }, "<");

      const ecoApps = document.querySelectorAll(".eco-app");
      ecoApps.forEach((app, idx) => {
        const angle = (idx / ecoApps.length) * Math.PI * 2;
        const radius = 170;
        const targetX = Math.cos(angle) * radius;
        const targetY = Math.sin(angle) * radius;
        
        tl.fromTo(app, 
          { x: targetX * 3.5, y: targetY * 3.5, opacity: 0, scale: 0 },
          { x: targetX, y: targetY, opacity: 1, scale: 1, duration: 2.5, ease: "back.out(1.1)" },
          `<${idx * 0.3}`
        );
      });
      tl.to("#ecosystem-net", { rotation: 25, duration: 3.5 }, "<");
      tl.to({}, { duration: 3.5 }); // HOLD SCENE 4

      // Scene 4 -> 5 (Ecosystem to AI)
      tl.to("#stage-core-scroll", { x: "20vw", y: "0vh", scale: 0.95, opacity: 1, duration: 2.5 });
      tl.to(ecoApps, { scale: 0.2, opacity: 0, duration: 2 }, "<");

      tl.to("#prompt-typing-text", {
        width: "350px",
        duration: 2.5,
        onStart: () => {
          simulateTyping("Xử lý dữ liệu CRM và soạn thảo email tư vấn bằng AI...");
        }
      });
      const aiCards = document.querySelectorAll(".ai-card");
      aiCards.forEach((card, idx) => {
        tl.fromTo(card, { y: 40, scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.5 }, `<${idx * 0.4}`);
      });
      tl.to({}, { duration: 3.5 }); // HOLD SCENE 5

      // Scene 5 -> 6 (AI to Playground)
      tl.to("#stage-core-scroll", { x: "0vw", y: "0vh", scale: 0.4, opacity: 0, duration: 2.5 });
      tl.to("#playground-viewport", { scale: 1, opacity: 1, y: 0, duration: 2.5 });
      tl.to({}, { duration: 6 }); // HOLD SCENE 6 (Playground)

      // Scene 6 -> 7 (Playground to Showcase)
      tl.to("#playground-viewport", { scale: 0.92, opacity: 0, y: -40, duration: 2 });
      tl.fromTo(".featured-showcase-container", { x: 150, opacity: 0 }, { x: 0, opacity: 1, duration: 2.5 });
      tl.to({}, { duration: 4.5 }); // HOLD SCENE 7
    });

    // 2. LAPTOP & MOBILE ANIMATIONS (Centered)
    mm.add("(max-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#automation-story-trigger",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: false,
          onUpdate: (self) => {
            updateSceneVisibility(self.progress);
          }
        }
      });

      tl.set("#stage-core-scroll", { x: "0vw", y: "12vh", scale: 0.8, opacity: 1 });
      
      const taskCards = document.querySelectorAll(".task-card");
      if (taskCards.length >= 5) {
        tl.fromTo(taskCards[0], { x: -150, y: -100, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, 0.2);
        tl.fromTo(taskCards[1], { x: 150, y: 100, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, 0.4);
        tl.fromTo(taskCards[2], { x: -150, y: 100, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, 0.6);
        tl.fromTo(taskCards[3], { x: 150, y: -100, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, 0.8);
        tl.fromTo(taskCards[4], { x: -50, y: 150, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, 1.0);
      }
      tl.to("#stage-core-scroll", { scale: 0.72, duration: 2 }, 0);
      tl.to({}, { duration: 3.5 });

      // S2 -> S3 (Workflow)
      tl.to("#stage-core-scroll", { y: "20vh", scale: 0.42, opacity: 0.15, duration: 2.5 });
      if (taskCards.length >= 5) {
        tl.to(taskCards, { scale: 0.5, opacity: 0, duration: 2 }, "<");
      }
      const flowNodes = document.querySelectorAll(".flow-node");
      flowNodes.forEach((node, idx) => {
        tl.fromTo(node, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 }, `<${idx * 0.3}`);
      });
      tl.to({}, { duration: 3.5 });

      // S3 -> S4 (Ecosystem)
      tl.to("#stage-core-scroll", { y: "12vh", scale: 0.8, opacity: 1, duration: 2.5 });
      tl.to(flowNodes, { scale: 0.3, opacity: 0, duration: 2 }, "<");
      
      const ecoApps = document.querySelectorAll(".eco-app");
      ecoApps.forEach((app, idx) => {
        const angle = (idx / ecoApps.length) * Math.PI * 2;
        const radius = isMobile ? 85 : 120;
        const targetX = Math.cos(angle) * radius;
        const targetY = Math.sin(angle) * radius;
        
        tl.fromTo(app, 
          { x: targetX * 2, y: targetY * 2, opacity: 0, scale: 0 },
          { x: targetX, y: targetY, opacity: 1, scale: 1, duration: 2, ease: "back.out(1.1)" },
          `<${idx * 0.25}`
        );
      });
      tl.to({}, { duration: 3.5 });

      // S4 -> S5 (AI)
      tl.to("#stage-core-scroll", { scale: 0.75, duration: 2.5 });
      tl.to(ecoApps, { scale: 0.2, opacity: 0, duration: 2 }, "<");
      tl.to("#prompt-typing-text", {
        width: "250px",
        duration: 2.5,
        onStart: () => {
          simulateTyping("Xử lý dữ liệu CRM bằng AI...");
        }
      });
      const aiCards = document.querySelectorAll(".ai-card");
      aiCards.forEach((card, idx) => {
        tl.fromTo(card, { y: 25, scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.5 }, `<${idx * 0.3}`);
      });
      tl.to({}, { duration: 3.5 });

      // S5 -> S6 (Playground)
      tl.to("#stage-core-scroll", { scale: 0.4, opacity: 0, duration: 2.5 });
      tl.to("#playground-viewport", { scale: 1, opacity: 1, y: 0, duration: 2.5 });
      tl.to({}, { duration: 5.5 });

      // S6 -> S7 (Showcase)
      tl.to("#playground-viewport", { scale: 0.92, opacity: 0, y: -30, duration: 2 });
      tl.fromTo(".featured-showcase-container", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 2.5 });
      tl.to({}, { duration: 3.5 });
    });

    setupOrbitNodeEvents();
  }

  // Update center core icon based on active scene (Lucide instead of emojis)
  const sceneIcons = {
    "scene-1": "cpu",
    "scene-2": "alert-triangle",
    "scene-3": "git-branch",
    "scene-4": "network",
    "scene-5": "sparkles",
    "scene-6": "terminal",
    "scene-7": "shopping-bag"
  };
  
  function updateCoreCenterIcon(sceneId) {
    const iconName = sceneIcons[sceneId] || "cpu";
    const centerEl = document.getElementById("core-icon");
    if (centerEl && centerEl.dataset.currentIcon !== iconName) {
      centerEl.dataset.currentIcon = iconName;
      centerEl.innerHTML = `<i data-lucide="${iconName}" style="width: 50%; height: 50%; color: #fff;"></i>`;
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ nodes: [centerEl] });
      }
    }
  }

  // Setup events for orbiting interactive nodes
  function setupOrbitNodeEvents() {
    document.querySelectorAll(".core-node").forEach(node => {
      // Hover glow color feedback
      node.addEventListener("mouseenter", () => {
        const nodeType = node.dataset.node;
        const glowEl = document.querySelector(".core-glow");
        if (glowEl) {
          let color = "var(--purple)";
          if (nodeType === "email") color = "var(--purple-light)";
          else if (nodeType === "ai") color = "var(--cyan)";
          else if (nodeType === "database") color = "var(--blue)";
          else if (nodeType === "crm") color = "var(--green)";
          else if (nodeType === "social") color = "var(--red)";
          else if (nodeType === "analytics") color = "#f59e0b";
          
          glowEl.style.background = `radial-gradient(circle, ${color} 0%, transparent 68%)`;
        }
      });
      
      node.addEventListener("mouseleave", () => {
        const glowEl = document.querySelector(".core-glow");
        if (glowEl) {
          glowEl.style.background = ""; // Reset to purple
        }
      });

      // Click to open slide-out / bottom detail sheet
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        const nodeType = node.dataset.node;
        const details = NODE_DETAILS[nodeType];
        if (details) {
          openDetailPanel(details);
        }
      });
    });
  }

  // Detail panel slide-in handlers
  function openDetailPanel(details) {
    const panel = document.getElementById("core-detail-panel");
    if (!panel) return;
    
    panel.innerHTML = `
      <div class="core-detail-panel__header">
        <h3 class="core-detail-panel__title">
          <i data-lucide="${details.icon}"></i> ${details.name}
        </h3>
        <span class="core-detail-panel__close" onclick="event.stopPropagation(); SoftwareStore.Story.closeDetailPanel()">
          <i data-lucide="x" style="width: 16px; height: 16px;"></i>
        </span>
      </div>
      <p class="core-detail-panel__desc">${details.desc}</p>
      <div class="core-detail-panel__tool">
        <div class="core-detail-panel__tool-info">
          <span class="core-detail-panel__tool-name">${details.tool}</span>
          <span class="core-detail-panel__tool-price">${details.price}</span>
        </div>
        <a href="#/product/${details.productId}" class="btn btn--primary btn--sm" style="padding: 6px 12px; font-size: 0.75rem;">
          Chi tiết <i data-lucide="chevron-right" style="width: 12px; height: 12px; margin-left: 2px; display: inline-block; vertical-align: middle;"></i>
        </a>
      </div>
    `;
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({ nodes: [panel] });
    }
    
    panel.classList.add("is-open");
  }

  function closeDetailPanel() {
    const panel = document.getElementById("core-detail-panel");
    if (panel) {
      panel.classList.remove("is-open");
    }
  }

  // Update scene states based on local progress math
  function updateSceneVisibility(progress) {
    const isMobile = window.innerWidth <= 1024;
    
    // Update mobile progress bar
    const mobBar = document.getElementById("story-progress-mobile-bar");
    if (mobBar) {
      mobBar.style.width = `${progress * 100}%`;
    }

    scenesConfig.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;

      const localProgress = Math.min(Math.max((progress - s.start) / (s.end - s.start), 0), 1);
      
      let opacity, blur, yVal, scaleVal;
      
      if (isMobile) {
        // Mobile custom stage thresholds (Enter: 20%, Hold: 58%, Exit: 22%)
        if (localProgress < 0.20) {
          opacity = mapRange(localProgress, 0, 0.20, 0, 1);
          blur = mapRange(localProgress, 0, 0.15, 6, 0);
          yVal = mapRange(localProgress, 0, 0.20, 30, 0);
          scaleVal = mapRange(localProgress, 0, 0.20, 0.98, 1);
        } else if (localProgress <= 0.78) {
          opacity = 1;
          blur = 0;
          yVal = 0;
          scaleVal = 1;
        } else {
          opacity = mapRange(localProgress, 0.78, 1, 1, 0);
          blur = mapRange(localProgress, 0.82, 1, 0, 5);
          yVal = mapRange(localProgress, 0.78, 1, 0, -25);
          scaleVal = 1;
        }
      } else {
        // Desktop thresholds (Enter: 18%, Hold: 54%, Exit: 28%)
        opacity = getSceneOpacity(localProgress);
        blur = getSceneBlur(localProgress);
        yVal = getSceneY(localProgress);
        scaleVal = getSceneScale(localProgress);
      }

      // Apply math visual properties to DOM
      el.style.opacity = opacity;
      el.style.filter = blur > 0 ? `blur(${blur}px)` : "";
      el.style.transform = `translateY(${yVal}px) scale(${scaleVal})`;
      
      // Strict visibility & pointer-events toggle
      const isActive = opacity > 0.05;
      el.style.visibility = isActive ? "visible" : "hidden";
      el.style.pointerEvents = opacity > 0.82 ? "auto" : "none";
      el.setAttribute("aria-hidden", opacity < 0.1 ? "true" : "false");

      // Set side indicator dot states
      const dot = document.querySelector(`.progress-dot-wrapper[data-scene-id="${s.id}"]`);
      if (dot) {
        dot.classList.toggle("is-active", progress >= s.start && progress < s.end);
      }

      // Context state updates
      if (progress >= s.start && progress < s.end) {
        updateCoreCenterIcon(s.id);
        
        if (s.id === "scene-3") {
          triggerNodeFlowSim();
        }
      }
    });

    // Toggle core layer presence based on scene 6 (Playground) and 7 (Showcase)
    const coreEl = document.getElementById("stage-core-scroll");
    if (coreEl) {
      if (progress >= 0.65) {
        coreEl.style.opacity = "0";
        coreEl.style.pointerEvents = "none";
      } else {
        coreEl.style.opacity = "";
        coreEl.style.pointerEvents = "";
      }
    }
  }

  // Simulate prompt typing
  let typingTimer;
  function simulateTyping(text) {
    const textEl = document.getElementById("prompt-typing-text");
    if (!textEl) return;
    
    textEl.textContent = "";
    clearInterval(typingTimer);
    
    let index = 0;
    typingTimer = setInterval(() => {
      if (index < text.length) {
        textEl.textContent += text[index];
        index++;
      } else {
        clearInterval(typingTimer);
      }
    }, 45);
  }

  // Node flow lighting indicator simulator
  let simTimer;
  function triggerNodeFlowSim() {
    const nodes = ["node-trigger-1", "node-ai-1", "node-crm-1", "node-mail-1"];
    nodes.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.className = "flow-node";
    });

    clearTimeout(simTimer);
    
    let currentIdx = 0;
    const runStep = () => {
      if (currentIdx >= nodes.length) {
        simTimer = setTimeout(() => {
          currentIdx = 0;
          triggerNodeFlowSim();
        }, 2500);
        return;
      }

      const prevEl = document.getElementById(nodes[currentIdx - 1]);
      if (prevEl) {
        prevEl.classList.remove("is-active");
        prevEl.classList.add("is-completed");
      }

      const activeEl = document.getElementById(nodes[currentIdx]);
      if (activeEl) {
        activeEl.classList.add("is-active");
      }

      currentIdx++;
      simTimer = setTimeout(runStep, 1800);
    };

    runStep();
  }

  // Scroll smoothly to target progress position
  function scrollToProgress(pct) {
    const triggerEl = document.getElementById("automation-story-trigger");
    if (triggerEl) {
      const startOffset = triggerEl.offsetTop;
      const totalScrollable = triggerEl.scrollHeight - window.innerHeight;
      const targetScroll = startOffset + (totalScrollable * pct);
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }

  function scrollToPlayground() {
    // Scroll to Cảnh 6 (Playground) start pct (approx 0.672)
    scrollToProgress(0.68);
  }

  // Interactive product test in playground helper
  function tryProductInPlayground(productId) {
    localStorage.setItem('softZone_autoRunProduct', productId);
    scrollToPlayground();

    setTimeout(() => {
      if (SoftwareStore.Playground && SoftwareStore.Playground.loadProductTemplate) {
        SoftwareStore.Playground.loadProductTemplate(productId);
      }
    }, 900);
  }

  return {
    render,
    init() {
      initScrollAnimation();
    },
    scrollToProgress,
    scrollToPlayground,
    tryProductInPlayground,
    closeDetailPanel
  };
})();
