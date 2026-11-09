/* ==========================================================================
   VÕ NHẬT MINH - CYBERSECURITY & DEFENSE PORTFOLIO
   Interactive Script & Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initProjectFiltering();
  initModalSystem();
  initCopyClipboard();
  initContactForm();
  initParallaxHUD();
});

/* --------------------------------------------------
   1. THEME TOGGLE (DARK / LIGHT MODE)
   -------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  
  if (!toggleBtn) return;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('minh_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('minh_portfolio_theme', nextTheme);
    updateThemeIcons(nextTheme);

    showToast(`Đã chuyển sang giao diện ${nextTheme === 'dark' ? 'Tối (Cyber Dark)' : 'Sáng (Clean Light)'}`);
  });

  function updateThemeIcons(theme) {
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
      toggleBtn.setAttribute('title', 'Chuyển sang giao diện Sáng');
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
      toggleBtn.setAttribute('title', 'Chuyển sang giao diện Tối');
    }
  }
}

/* --------------------------------------------------
   2. NAVIGATION & ACTIVE SPY
   -------------------------------------------------- */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  // Mobile menu toggle
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });

    // Close when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // Active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------
   3. PROJECT FILTERING
   -------------------------------------------------- */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------
   4. MODAL SYSTEM FOR PROJECTS & ARTICLES
   -------------------------------------------------- */
const modalData = {
  project1: {
    title: 'SOC Alert Triage & Incident Response Lab',
    category: 'Bảo mật & SOC • SIEM • Blue Team',
    content: `
      <h3>Mô hình phòng thí nghiệm giám sát SOC và ứng phó sự cố</h3>
      <p>Dự án xây dựng một hạ tầng SOC thu nhỏ (Home Lab / Cloud Lab) hoàn chỉnh với mục tiêu mô phỏng các tình huống tấn công mạng thực tế, từ đó rèn luyện kỹ năng phát hiện, phân loại (triage) và xử lý sự cố an toàn thông tin.</p>
      
      <h4>Kiến trúc hệ thống:</h4>
      <ul>
        <li><strong>SIEM Engine:</strong> Cài đặt và cấu hình cụm Wazuh Manager kết hợp với Elasticsearch và Kibana để thu thập, phân tích tập trung toàn bộ nhật ký sự kiện.</li>
        <li><strong>Network IDS:</strong> Triển khai Suricata để bắt và phân tích lưu lượng mạng (packet analysis), phát hiện các mẫu quét cổng (Nmap), truy cập mã độc và lưu lượng C2 nghi vấn.</li>
        <li><strong>Endpoint Telemetry:</strong> Cài đặt Wazuh Agent và Sysmon trên các máy chủ Windows Server và Linux trạm, tinh chỉnh file cấu hình <code>sysmonconfig-export.xml</code> (SwiftOnSecurity) để tối ưu hóa việc bắt dấu vết mã độc (Process Creation, Network Connections, Image Loads).</li>
      </ul>

      <h4>Các kịch bản tấn công & Kỹ thuật điều tra:</h4>
      <ul>
        <li><strong>Brute-force SSH & RDP:</strong> Xây dựng custom rule cảnh báo khi có hơn 5 lần đăng nhập thất bại trong 60 giây và tự động kích hoạt active response để khóa IP tấn công.</li>
        <li><strong>Web Shell Detection:</strong> Phân tích hành vi tạo file lạ trong thư mục web server (Apache/Nginx) và phát hiện lệnh thực thi bất thường (whoami, net user, curl).</li>
        <li><strong>Persistence Check:</strong> Phát hiện việc tạo Scheduled Tasks hoặc Registry Run Keys mới để duy trì truy cập.</li>
      </ul>

      <h4>Kết quả đạt được:</h4>
      <p>Hệ thống giúp rút ngắn thời gian phân loại cảnh báo giả (False Positives), chuẩn hóa quy trình báo cáo điều tra sự cố theo chuẩn NIST SP 800-61, và nâng cao năng lực ứng phó tình huống SOC Tier 1.</p>
    `
  },
  project2: {
    title: 'Automated Volatility Memory Forensics Analyzer',
    category: 'Pháp chứng số • Phân tích bộ nhớ • Forensics',
    content: `
      <h3>Công cụ tự động hóa điều tra pháp chứng số trên bộ nhớ RAM</h3>
      <p>Một bộ công cụ hỗ trợ các chuyên viên phân tích pháp chứng trích xuất và tương quan hóa nhanh các bằng chứng kỹ thuật số từ các tập tin kết xuất bộ nhớ (RAM dump) định dạng RAW, Crash dump, hoặc VMEM.</p>

      <h4>Tính năng nổi bật:</h4>
      <ul>
        <li><strong>Nhận diện tự động Kernel Profile:</strong> Tự động xác định cấu trúc hệ điều hành (Windows 10/11, Windows Server) tương thích với engine Volatility 3.</li>
        <li><strong>Process Tree & Network Triage:</strong> Quét các tiến trình ẩn danh (Unlinked Process), phân tích cây tiến trình cha-con (<code>windows.pstree</code>) để phát hiện hành vi mạo danh các tiến trình hợp lệ như <code>svchost.exe</code>, <code>explorer.exe</code>.</li>
        <li><strong>Code Injection & DLL Analysis:</strong> Kiểm tra vùng nhớ thực thi bất thường (<code>windows.malfind</code>), phát hiện DLL rỗng hoặc kỹ thuật Process Hollowing / DLL Injection.</li>
        <li><strong>Trích xuất Network Artifacts:</strong> Tương quan các cổng mở và kết nối TCP/UDP với PID cụ thể để tìm máy chủ C2.</li>
      </ul>

      <h4>Tích hợp & Khả năng mở rộng:</h4>
      <p>Tự động trích xuất các file nhị phân đáng ngờ và tính toán mã băm SHA-256 để truy vấn thông tin độ tin cậy trên VirusTotal API, giúp đưa ra kết luận nhanh chóng trong các vụ việc điều tra vi phạm dữ liệu.</p>
    `
  },
  project3: {
    title: 'Malware Static Triage & IOC Hunter',
    category: 'Mã độc • Phân tích tĩnh • IOC Extraction',
    content: `
      <h3>Phần mềm phân tích sơ bộ mã độc tĩnh và trích xuất chỉ số IOC</h3>
      <p>Được thiết kế nhằm hỗ trợ quá trình sơ kiểm an toàn (safe preliminary triage) các mẫu file đáng ngờ trước khi chuyển giao vào môi trường Dynamic Sandbox phân tích sâu.</p>

      <h4>Các module kiểm tra chính:</h4>
      <ul>
        <li><strong>File Hashing & Metadata:</strong> Tính toán mã băm MD5, SHA-1, SHA-256 và so khớp cơ sở dữ liệu NIST NSRL để loại bỏ các tệp hệ điều hành chuẩn.</li>
        <li><strong>PE Header Inspection:</strong> Phân tích cấu trúc PE (Portable Executable), kiểm tra bảng Import Address Table (IAT) để phát hiện các Windows API nhạy cảm thường dùng trong malware (như <code>VirtualAlloc</code>, <code>WriteProcessMemory</code>, <code>CreateRemoteThread</code>).</li>
        <li><strong>Entropy Calculation:</strong> Đo độ hỗn loạn (Entropy) của các phân vùng (.text, .rdata, .data) nhằm phát hiện dấu hiệu packer, crypter hoặc shellcode bị nén/mã hóa.</li>
        <li><strong>IOC String Extractor:</strong> Quét các chuỗi ký tự ASCII và Unicode để tìm kiếm địa chỉ IPv4, Domain URL, ví tiền điện tử, và email được nhúng cứng.</li>
        <li><strong>YARA Rule Matching:</strong> Tích hợp các tập luật YARA phòng thủ nhằm nhận diện họ mã độc (Ransomware, Infostealer, Backdoor).</li>
      </ul>
    `
  },
  project4: {
    title: 'Network Traffic & Anomaly Packet Analyzer',
    category: 'Mạng & Giám sát • Packet Analysis • Python',
    content: `
      <h3>Bộ công cụ giám sát lưu lượng và phát hiện bất thường gói tin mạng</h3>
      <p>Dự án viết bằng Python tận dụng sức mạnh của thư viện Scapy và Wireshark / TShark để phân tích sâu các tập tin bắt gói tin mạng (.pcap / .pcapng) ở quy mô thực tế.</p>

      <h4>Khả năng phát hiện:</h4>
      <ul>
        <li><strong>Port Scan Detection:</strong> Nhận diện các kỹ thuật quét cổng Stealth SYN scan, FIN scan, Xmas scan dựa trên ngưỡng tần suất gói tin gửi tới nhiều cổng trong khoảng thời gian ngắn.</li>
        <li><strong>DNS Exfiltration / Tunneling:</strong> Phân tích kích thước câu truy vấn DNS bất thường và mật độ truy vấn Subdomain có độ ngẫu nhiên cao (High Entropy) dùng để tuồn dữ liệu ra ngoài.</li>
        <li><strong>Cleartext Credential Leakage:</strong> Cảnh báo khi phát hiện mật khẩu truyền tải dưới dạng bản rõ qua các giao thức HTTP POST, FTP, Telnet.</li>
      </ul>

      <h4>Báo cáo xuất ra:</h4>
      <p>Tự động xuất bảng thống kê lưu lượng (Conversations, Top Talkers, GeoIP Mapping) và danh sách cảnh báo theo chuẩn CEF (Common Event Format) sẵn sàng gửi vào SIEM.</p>
    `
  },
  article1: {
    title: 'Kỹ thuật phân tích nhật ký Windows Event Logs phát hiện leo thang đặc quyền',
    category: 'Điều tra sự cố • Windows Event Logs • Splunk / Wazuh',
    content: `
      <h3>Phân tích chuyên sâu các Event ID quan trọng trong điều tra phòng thủ</h3>
      <p>Khi kẻ tấn công đã có được quyền truy cập ban đầu (Initial Access), bước tiếp theo hầu như luôn là leo thang đặc quyền (Privilege Escalation) và duy trì sự hiện diện. Dưới đây là các kỹ thuật phân tích nhật ký Windows giúp phát hiện kịp thời các hành vi này.</p>

      <h4>1. Bộ mã sự kiện (Event IDs) cần tập trung theo dõi:</h4>
      <ul>
        <li><strong>Event ID 4624 (Logon):</strong> Đặc biệt lưu ý Logon Type 3 (Network Logon) và Type 10 (RemoteInteractive/RDP). So sánh xem tài khoản đăng nhập có thuộc nhóm nhạy cảm (Domain Admins) đăng nhập từ máy trạm bất thường hay không.</li>
        <li><strong>Event ID 4625 (Failed Logon):</strong> Chuỗi thất bại liên tiếp với mã phụ <code>0xC000006A</code> (sai mật khẩu) hoặc <code>0xC0000234</code> (tài khoản bị khóa) là dấu hiệu rõ ràng của Brute-force hoặc Password Spraying.</li>
        <li><strong>Event ID 4672 (Special Privileges Assigned):</strong> Sự kiện ghi nhận khi người dùng đăng nhập với các quyền hạn đặc biệt (như <code>SeDebugPrivilege</code>, <code>SeTakeOwnershipPrivilege</code>). Kẻ tấn công thường lạm dụng SeDebugPrivilege để dump bộ nhớ LSASS.</li>
        <li><strong>Event ID 7045 / 4697 (New Service Installed):</strong> Các công cụ như PsExec hoặc mã độc thường tạo một Windows Service mới để chạy payload với quyền <code>NT AUTHORITY\\SYSTEM</code>.</li>
      </ul>

      <h4>2. Phát hiện lạm dụng lệnh thực thi với Sysmon Event ID 1:</h4>
      <p>Bật ghi nhận dòng lệnh đầy đủ (Full Command Line) trên Sysmon để phát hiện các tiến trình con được sinh ra từ các ứng dụng văn phòng (e.g. <code>WINWORD.EXE → powershell.exe -enc ...</code>) hoặc việc sử dụng các tiện ích có sẵn của hệ điều hành (LOLBins) như <code>certutil.exe -urlcache</code>, <code>bitsadmin</code>, hoặc <code>mshta</code>.</p>
    `
  },
  article2: {
    title: 'Quy trình trích xuất IOC từ tài liệu Office Macro độc hại mà không cần thực thi',
    category: 'Mã độc • Malware Triage • Phân tích tài liệu',
    content: `
      <h3>Phương pháp phân tích tĩnh an toàn đối với các mẫu Email Phishing đính kèm file Office</h3>
      <p>Tấn công qua email lừa đảo chứa tệp đính kèm Word (.docm, .doc) hoặc Excel (.xlsm) có gắn mã Macro VBA vẫn là một trong những vector xâm nhập phổ biến nhất của các nhóm tin tặc.</p>

      <h4>Các bước thực hiện trong phòng lab cô lập:</h4>
      <ul>
        <li><strong>Bước 1 - Khảo sát cấu trúc tệp với Oledump:</strong> Sử dụng công cụ <code>oledump.py</code> để kiểm tra các luồng dữ liệu (streams). Các luồng có chữ cái 'M' hoặc 'm' biểu thị sự tồn tại của Macro VBA.</li>
        <li><strong>Bước 2 - Trích xuất mã VBA với Olevba:</strong> Sử dụng <code>olevba [filename]</code> thuộc bộ công cụ oletools để trích xuất mã nguồn VBA thô và tự động nhận diện các từ khóa nguy hiểm (AutoOpen, Document_Open, Shell, WScript.Shell, URLDownloadToFile).</li>
        <li><strong>Bước 3 - Giải mã chuỗi bị xáo trộn (De-obfuscation):</strong> Kẻ tấn công thường che giấu payload bằng các hàm như <code>Chr()</code>, phép toán XOR, hoặc đảo ngược chuỗi (<code>StrReverse</code>). Sử dụng trình phân tích ViperMonkey để mô phỏng môi trường thực thi và bóc tách các URL C2 thực sự mà không cần chạy file nhị phân.</li>
      </ul>
      <p><strong>Kết quả:</strong> Trích xuất nhanh chóng địa chỉ IP, tên miền phân phối payload độc và cập nhật ngay vào danh sách chặn của Firewall/Proxy tổ chức.</p>
    `
  },
  article3: {
    title: 'Xây dựng Home Lab an ninh mạng phòng thủ với Wazuh SIEM và pfSense',
    category: 'Lab Setup • Kiến trúc mạng an toàn • Blue Team',
    content: `
      <h3>Hướng dẫn thiết lập môi trường thực hành SOC thực tế với chi phí tối ưu</h3>
      <p>Một môi trường lab thực tế là điều kiện tiên quyết để nắm vững kỹ năng giám sát và phòng thủ mạng. Dưới đây là kiến trúc mạng khuyên dùng cho sinh viên và kỹ sư an ninh mạng mới vào nghề.</p>

      <h4>Kiến trúc phân chia vùng mạng (Network Segmentation):</h4>
      <ul>
        <li><strong>Vùng Quản lý (Management Subnet - 192.168.10.0/24):</strong> Máy trạm phân tích (SIEM Console, Kali Linux, Forensic Workstation).</li>
        <li><strong>Vùng Giám sát & Máy chủ (Server Subnet - 192.168.20.0/24):</strong> Wazuh SIEM All-in-One VM, Domain Controller Windows Server 2022.</li>
        <li><strong>Vùng Mục tiêu / Tấn công (Victim / Lab Subnet - 192.168.30.0/24):</strong> Windows 10/11 Endpoint, Ubuntu Web Server dễ bị tổn thương (DVWA, Metasploitable).</li>
      </ul>

      <h4>Tường lửa pfSense và SPAN/Mirror Port:</h4>
      <p>Sử dụng pfSense làm router/firewall trung tâm kết nối các VLAN. Cấu hình tính năng Port Mirroring để nhân bản toàn bộ gói tin đi qua mạng và đẩy về giao diện của Suricata IDS, giúp học viên quan sát trực tiếp các cảnh báo khi chạy các bài test xâm nhập trong nội bộ lab.</p>
    `
  }
};

function initModalSystem() {
  const overlay = document.getElementById('modal-overlay');
  const dialog = document.getElementById('modal-dialog');
  const body = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!overlay || !body) return;

  // Open modal triggers
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetKey = trigger.getAttribute('data-modal-target');
      const data = modalData[targetKey];

      if (data) {
        body.innerHTML = data.content;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------
   5. COPY TO CLIPBOARD SYSTEM
   -------------------------------------------------- */
function initCopyClipboard() {
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = button.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Đã chép';
        showToast(`Đã sao chép: ${textToCopy}`);

        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Đã sao chép: ${textToCopy}`);
      }
    });
  });
}

/* --------------------------------------------------
   6. CONTACT FORM HANDLING
   -------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const subject = document.getElementById('form-subject')?.value.trim() || 'Liên hệ từ Portfolio';
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Vui lòng điền đầy đủ các thông tin bắt buộc!', 'warning');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Đang xử lý...';
    }

    // Open mail client with prefilled information
    const mailtoLink = `mailto:vonhatminh0209@gmail.com?subject=${encodeURIComponent(subject + ' - [Từ ' + name + ']')}&body=${encodeURIComponent('Họ và tên: ' + name + '\nEmail: ' + email + '\n\nNội dung:\n' + message)}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      showToast('Đang mở ứng dụng gửi thư đến Võ Nhật Minh...', 'success');
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Gửi tin nhắn';
      }
    }, 600);
  });
}

/* --------------------------------------------------
   7. TOAST NOTIFICATION UTILITY
   -------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

/* --------------------------------------------------
   8. HUD CARD SUBTLE PARALLAX ON MOUSEMOVE
   -------------------------------------------------- */
function initParallaxHUD() {
  const card = document.querySelector('.hero-card');
  if (!card) return;

  // Only run on desktop screens with fine pointer
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tiltX = (y / (rect.height / 2)) * -5;
      const tiltY = (x / (rect.width / 2)) * 5;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }
}
