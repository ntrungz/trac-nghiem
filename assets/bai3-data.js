// Bài 3: Khuếch đại BJT mắc EC — Dữ liệu kiểm chứng & Logic tương tác
(function () {
  const PROBLEMS = {
    1: {
      id: 1,
      name: "Câu 1: EC Phân cực cố định",
      shortType: "3.1 Phân cực cố định",
      topology: "fixed",
      hasRE: false,
      hasCE: false,
      specs: "+Ucc = 12 V; RB = 470 kΩ; RC = 1,8 kΩ; C1 = C2 = 2,2 µF; β = 120; UBE = 0,7 V; UT = 26 mV; ro = ∞",
      params: { Ucc: 12, RB: 470, RC: 1.8, RE: 0, beta: 120, C1: "2,2 µF", C2: "2,2 µF" },
      ans: {
        IB: 24.04, IC: 2.88, IE: 2.91, UCE: 6.816,
        ICsat: 6.67, UCEcut: 12,
        re: 8.93, Zv: 1069.16, ZvUnit: "Ω", Zr: 1.8, ZrUnit: "kΩ", Ku: -201.57, Ki: 120
      },
      steps: [
        {
          title: "Bước 1/5 · Tính dòng và áp phân cực tĩnh (IB, IC, IE, UCE)",
          diagTab: "dc",
          q: "Ở chế độ một chiều (DC), các tụ C1, C2 hở mạch. Áp dụng KVL cho vòng Base và Collector, bộ giá trị đúng của IB, IC, IE, UCE là:",
          hints: [
            "Tầng 1 (Phương pháp): Mạch phân cực cố định có cực E nối đất trực tiếp (RE = 0), dòng IB chỉ đi qua RB.",
            "Tầng 2 (Công thức): IB = (Ucc − UBE) / RB; IC = β·IB; IE = (β + 1)·IB; UCE = Ucc − IC·RC.",
            "Tầng 3 (Thay số): IB = (12 − 0,7) / 470k = 24,04 µA → IC = 120 × 24,04 µA = 2,88 mA → UCE = 12 − 2,88 × 1,8 = 6,816 V."
          ],
          options: [
            { text: "IB = 24,04 µA; IC = 2,88 mA; IE = 2,91 mA; UCE = 6,816 V", correct: true },
            { text: "IB = 25,53 µA; IC = 3,06 mA; IE = 3,09 mA; UCE = 6,492 V", correct: false, why: "Lỗi quên trừ UBE = 0,7 V khi tính IB (bạn đã lấy 12 V / 470 kΩ = 25,53 µA)." },
            { text: "IB = 16,47 µA; IC = 1,98 mA; IE = 1,99 mA; UCE = 8,436 V", correct: false, why: "Lỗi nhầm sang mạch hồi tiếp cực C: cộng thêm β·RC vào mẫu số của IB." },
            { text: "IB = 24,04 µA; IC = 2,88 mA; IE = 2,91 mA; UCE = 5,184 V", correct: false, why: "Lỗi dừng giữa chừng: 5,184 V mới là sụt áp IC·RC trên điện trở RC, quên lấy Ucc − IC·RC." }
          ],
          explain: "IB = (12 − 0,7) / (470·10³) = 24,04 µA; IC = 120·24,04·10⁻⁶ = 2,88 mA; IE = 121·24,04·10⁻⁶ = 2,91 mA; UCE = 12 − 2,88·10⁻³·1,8·10³ = 6,816 V."
        },
        {
          title: "Bước 2/5 · Phương trình đường tải tĩnh & Điểm làm việc Q",
          diagTab: "load",
          q: "Phương trình đường tải tĩnh và 2 giao điểm cắt trục tọa độ (khi UCE = 0 và khi IC = 0) của mạch Câu 1 là:",
          hints: [
            "Tầng 1 (Phương pháp): Đường tải tĩnh biểu diễn quan hệ tuyến tính giữa IC và UCE ở mạch ra.",
            "Tầng 2 (Công thức): UCE = Ucc − IC·RC. Cho IC = 0 tìm điểm ngắt; cho UCE = 0 tìm dòng bão hòa IC(max).",
            "Tầng 3 (Thay số): UCE = 0 ⇒ IC = 12 / 1,8 kΩ = 6,67 mA; IC = 0 ⇒ UCE = 12 V."
          ],
          options: [
            { text: "UCE = Ucc − IC·RC; cắt trục tại (UCE = 12 V; IC = 0) và (UCE = 0; IC = 6,67 mA)", correct: true },
            { text: "UCE = Ucc − IC·(RC + RB); cắt trục tại (12 V; 0) và (0; 0,025 mA)", correct: false, why: "Lỗi đưa nhầm RB (thuộc vòng cực B) vào phương trình đường tải của vòng C-E." },
            { text: "UCE = Ucc − IC·RC; cắt trục tại (UCE = 6,82 V; IC = 0) và (UCE = 0; IC = 2,88 mA)", correct: false, why: "Lỗi nhầm tọa độ điểm làm việc tĩnh Q(6,82 V; 2,88 mA) với 2 giao điểm cắt trục tọa độ." },
            { text: "UCE = Ucc + IC·RC; cắt trục tại (UCE = 12 V; IC = 0) và (UCE = 0; IC = −6,67 mA)", correct: false, why: "Lỗi sai dấu trong định luật Kirchhoff áp cho vòng C-E." }
          ],
          explain: "Phương trình đường tải tĩnh: UCE = Ucc − IC·RC. Khi IC = 0 → UCE = 12 V; khi UCE = 0 → IC = 12 / 1,8k = 6,67 mA. Điểm Q(6,82 V; 2,88 mA) nằm giữa đường tải."
        },
        {
          title: "Bước 3/5 · Điện trở vi phân miền Emitter (re)",
          diagTab: "dc",
          q: "Với IE = 2,91 mA vừa tìm được và quy ước thế nhiệt UT = 26 mV, điện trở vi phân re bằng bao nhiêu?",
          hints: [
            "Tầng 1 (Phương pháp): Điện trở vi phân miền Emitter phụ thuộc vào dòng phân cực tĩnh IE.",
            "Tầng 2 (Công thức): re = UT / IE (lưu ý cùng đơn vị mV và mA sẽ ra Ω).",
            "Tầng 3 (Thay số): re = 26 mV / 2,91 mA = 8,93 Ω."
          ],
          options: [
            { text: "re = 8,93 Ω (và β·re = 1071,6 Ω)", correct: true },
            { text: "re = 9,03 Ω (lấy UT / IC = 26 / 2,88)", correct: false, why: "Lỗi công thức: trong vở của trường tính re = UT / IE = 26 / 2,91 = 8,93 Ω chứ không chia cho IC." },
            { text: "re = 1,08 Ω (lấy 26 / IB = 26 / 24,04)", correct: false, why: "Lỗi thay nhầm dòng IB (µA) thay vì dòng IE (mA) vào công thức re = UT / IE." },
            { text: "re = 8,93 kΩ", correct: false, why: "Lỗi sai đơn vị: 26 mV chia cho 2,91 mA thì m triệt tiêu cho m, kết quả phải là Ω chứ không phải kΩ." }
          ],
          explain: "re = UT / IE = 26 / 2,91 = 8,93 Ω ⇒ Tổng trở vào của riêng BJT là β·re = 120 × 8,93 = 1071,6 Ω."
        },
        {
          title: "Bước 4/5 · Nhận diện Sơ đồ tương đương xoay chiều",
          diagTab: "ac",
          q: "Khi chuyển sang sơ đồ tương đương xoay chiều tín hiệu nhỏ ở tần số trung bình, mạch Câu 1 biến đổi như thế nào?",
          hints: [
            "Tầng 1 (Nguyên tắc AC): Nguồn áp một chiều +Ucc có thế không đổi nên nối đất xoay chiều; các tụ ghép C1, C2 coi như ngắn mạch.",
            "Tầng 2 (Thay thế BJT): Cực E nối đất; giữa B và E là điện trở β·re; giữa C và E là nguồn dòng phụ thuộc β·IB hướng xuống đất song song ro.",
            "Tầng 3 (Kết nối RB, RC): Vì +Ucc nối đất nên RB nối từ B xuống đất (song song β·re) và RC nối từ C xuống đất."
          ],
          options: [
            { text: "Ngõ vào có RB // β·re nối đất; ngõ ra có nguồn dòng β·IB (hướng xuống) song song ro và RC nối đất", correct: true },
            { text: "Ngõ vào có RB nối tiếp β·re; ngõ ra có RC nối tiếp nguồn dòng β·IB", correct: false, why: "Lỗi quên nối đất nguồn +Ucc: khi +Ucc nối đất AC thì đầu trên của RB và RC đều nối đất (mắc song song)." },
            { text: "Ngõ vào chỉ có β·re (bỏ RB vì nối với Ucc); ngõ ra chỉ có RC", correct: false, why: "Lỗi bỏ sót RB: nguồn Ucc nối đất xoay chiều nghĩa là RB mắc từ cực B xuống đất, không bị triệt tiêu." },
            { text: "Điện trở RB nối từ cực B sang cực C tạo nhánh hồi tiếp", correct: false, why: "Đó là sơ đồ của Câu 6 (phân cực hồi tiếp từ cực C). Ở Câu 1, RB nối lên +Ucc nên ở AC phải nối xuống đất." }
          ],
          explain: "Ở chế độ AC: C1, C2 ngắn mạch, +Ucc nối đất ⇒ RB // β·re ở ngõ vào; nguồn dòng β·IB // ro // RC ở ngõ ra."
        },
        {
          title: "Bước 5/5 · Tính thông số xoay chiều Zv, Zr, Ku, Ki",
          diagTab: "ac",
          q: "Từ sơ đồ tương đương xoay chiều với RB = 470 kΩ, RC = 1,8 kΩ, re = 8,93 Ω, β·re = 1071,6 Ω, bộ kết quả Zv, Zr, Ku, Ki là:",
          hints: [
            "Tầng 1 (Tổng trở): Nhìn vào ngõ vào thấy RB // β·re; nhìn vào ngõ ra (với ro = ∞) chỉ thấy RC.",
            "Tầng 2 (Hệ số KĐ): Ku = −RC / re; vì RB = 470 kΩ ≥ 10·β·re (10,72 kΩ) và ro = ∞ nên dòng vào hầu như đi hết vào cực B ⇒ Ki ≈ β.",
            "Tầng 3 (Thay số): Zv = (470k × 1071,6)/(470k + 1071,6) = 1069,16 Ω; Ku = −1800 / 8,93 = −201,57."
          ],
          options: [
            { text: "Zv = 1069,16 Ω; Zr = 1,8 kΩ; Ku = −201,57; Ki ≈ 120", correct: true },
            { text: "Zv = 1071,6 Ω; Zr = 1,8 kΩ; Ku = +201,57; Ki ≈ 120", correct: false, why: "Hai lỗi: quên ghép song song RB với β·re khi tính Zv, và quên dấu trừ (−) thể hiện mạch EC đảo pha 180° trong Ku." },
            { text: "Zv = 1069,16 Ω; Zr = 1,8 kΩ; Ku = −1,68; Ki ≈ 120", correct: false, why: "Lỗi lấy Ku = −RC / (β·re) thay vì −RC / re (quên nhân β trên tử số hoặc chia dư cho β)." },
            { text: "Zv = 471,07 kΩ; Zr = 1,8 kΩ; Ku = −201,57; Ki ≈ 120", correct: false, why: "Lỗi cộng nối tiếp RB + β·re thay vì tính song song RB // β·re." }
          ],
          explain: "Zv = RB // β·re = 1069,16 Ω; Zr = RC = 1,8 kΩ; Ku = −RC / re = −1800 / 8,93 = −201,57; vì RB ≥ 10·β·re nên Ki ≈ β = 120."
        }
      ]
    },

    2: {
      id: 2,
      name: "Câu 2: EC Ổn định Emitter có tụ CE",
      shortType: "3.2 Emitter có tụ CE",
      topology: "emitter_bypass",
      hasRE: true,
      hasCE: true,
      specs: "+Ucc = 12 V; RB = 560 kΩ; RC = 2,4 kΩ; RE = 470 Ω; C1 = C2 = CE = 10 µF; β = 120; UBE = 0,7 V; ro = ∞",
      params: { Ucc: 12, RB: 560, RC: 2.4, RE: 470, beta: 120, C1: "10 µF", C2: "10 µF", CE: "10 µF" },
      ans: {
        IB: 18.32, IC: 2.20, IE: 2.22, UCE: 5.686,
        ICsat: 4.18, UCEcut: 12,
        re: 11.71, Zv: 1401.68, ZvUnit: "Ω", Zr: 2.4, ZrUnit: "kΩ", Ku: -204.95, Ki: 120
      },
      steps: [
        {
          title: "Bước 1/5 · Tính dòng và áp phân cực tĩnh (IB, IC, IE, UCE)",
          diagTab: "dc",
          q: "Ở chế độ DC, tụ CE hở mạch nên dòng IE = (β + 1)·IB đi qua RE = 470 Ω. Bộ giá trị một chiều IB, IC, IE, UCE đúng là:",
          hints: [
            "Tầng 1 (Phương pháp): Khi quy RE từ cực E về cực B ở mạch DC, điện trở tương đương tăng lên (β + 1) lần.",
            "Tầng 2 (Công thức): IB = (Ucc − UBE) / [RB + (β + 1)·RE]; UCE = Ucc − IC·(RC + RE).",
            "Tầng 3 (Thay số): IB = (12 − 0,7) / (560·10³ + 121 × 470) = 18,32 µA → IC = 2,20 mA; IE = 2,22 mA → UCE = 12 − 2,20·10⁻³·(2400 + 470) = 5,686 V."
          ],
          options: [
            { text: "IB = 18,32 µA; IC = 2,20 mA; IE = 2,22 mA; UCE = 5,686 V", correct: true },
            { text: "IB = 20,16 µA; IC = 2,42 mA; IE = 2,44 mA; UCE = 5,055 V", correct: false, why: "Lỗi quên nhân hệ số (β + 1) cho RE ở mẫu số khi tính IB: bạn đã chia cho (RB + RE) thay vì RB + (β + 1)RE." },
            { text: "IB = 18,32 µA; IC = 2,20 mA; IE = 2,22 mA; UCE = 6,720 V", correct: false, why: "Lỗi quên cộng RE vào RC khi tính UCE = Ucc − IC·(RC + RE) (bạn chỉ lấy 12 − 2,20 × 2,4 = 6,72 V)." },
            { text: "IB = 27,11 µA; IC = 3,25 mA; IE = 3,28 mA; UCE = 2,673 V", correct: false, why: "Lỗi đọc nhầm RB = 360 kΩ thay vì 560 kΩ theo đề bài." }
          ],
          explain: "IB = (12 − 0,7) / [560·10³ + (120 + 1)·470] = 18,32 µA; IC = 2,20 mA; IE = 2,22 mA; UCE = 12 − 2,20·10⁻³·(2400 + 470) = 5,686 V."
        },
        {
          title: "Bước 2/5 · Phương trình đường tải tĩnh & Điểm cắt trục",
          diagTab: "load",
          q: "Phương trình đường tải tĩnh và dòng bão hòa khi UCE = 0 của mạch Câu 2 là:",
          hints: [
            "Tầng 1 (Phương pháp): Ở chế độ DC, cả RC và RE đều nằm trên đường đi của dòng tĩnh.",
            "Tầng 2 (Công thức): UCE = Ucc − IC·(RC + RE). Khi UCE = 0 ⇒ IC = Ucc / (RC + RE).",
            "Tầng 3 (Thay số): IC(UCE=0) = 12 / (2,4·10³ + 470) = 12 / 2870 = 4,18 mA."
          ],
          options: [
            { text: "UCE = Ucc − IC·(RC + RE); cắt trục tại UCE = 12 V và IC = 4,18 mA", correct: true },
            { text: "UCE = Ucc − IC·RC; cắt trục tại UCE = 12 V và IC = 5,00 mA", correct: false, why: "Lỗi nhầm đường tải tĩnh (DC) với đường tải xoay chiều: ở DC tụ CE hở mạch nên phải có RE trong (RC + RE)." },
            { text: "UCE = Ucc − IC·(RC + RE); cắt trục tại UCE = 12 V và IC = 0,025 mA", correct: false, why: "Lỗi không đổi đồng nhất đơn vị giữa RC = 2,4 kΩ (2400 Ω) và RE = 470 Ω (lấy 2,4 + 470 = 472,4 kΩ)." },
            { text: "UCE = Ucc − IC·(RC + RE); cắt trục tại UCE = 5,69 V và IC = 2,20 mA", correct: false, why: "Đó là tọa độ điểm Q(5,69 V; 2,20 mA), không phải 2 điểm cắt trục tọa độ." }
          ],
          explain: "Đường tải tĩnh: UCE = Ucc − IC(RC + RE). Khi IC = 0 → UCE = 12 V; khi UCE = 0 → IC = 12 / (2400 + 470) = 4,18 mA."
        },
        {
          title: "Bước 3/5 · Tính điện trở vi phân re",
          diagTab: "dc",
          q: "Với IE = 2,22 mA và UT = 26 mV, giá trị điện trở vi phân re của BJT ở Câu 2 là:",
          hints: [
            "Tầng 1: Dùng công thức chuẩn re = UT / IE.",
            "Tầng 2: Thay UT = 26 mV, IE = 2,22 mA.",
            "Tầng 3: 26 / 2,22 = 11,7117... ≈ 11,71 Ω."
          ],
          options: [
            { text: "re = 11,71 Ω", correct: true },
            { text: "re = 11,82 Ω", correct: false, why: "Lỗi chia cho IC = 2,20 mA thay vì chia cho IE = 2,22 mA." },
            { text: "re = 1,42 Ω", correct: false, why: "Lỗi chia cho IB = 18,32 µA thay vì IE." },
            { text: "re = 57,72 Ω", correct: false, why: "Lỗi nhân 26 × 2,22 thay vì chia 26 / 2,22." }
          ],
          explain: "re = UT / IE = 26 / 2,22 = 11,71 Ω ⇒ β·re = 120 × 11,71 = 1405,2 Ω."
        },
        {
          title: "Bước 4/5 · Vai trò của tụ CE trên sơ đồ xoay chiều",
          diagTab: "ac",
          q: "Trên sơ đồ tương đương xoay chiều của Câu 2 (có tụ CE = 10 µF mắc song song với RE), điện trở RE sẽ như thế nào?",
          hints: [
            "Tầng 1: Tụ CE được gọi là tụ thoát Emitter (bypass capacitor).",
            "Tầng 2: Ở tần số tín hiệu xoay chiều, dung kháng XC_E ≈ 0 (coi như dây dẫn ngắn mạch).",
            "Tầng 3: Dây dẫn ngắn mạch mắc song song với RE sẽ nối tắt cực E thẳng xuống đất xoay chiều → RE biến mất khỏi mạch AC!"
          ],
          options: [
            { text: "Tụ CE nối tắt RE xuống đất ở chế độ xoay chiều, nên sơ đồ AC không còn RE (cực E nối đất trực tiếp)", correct: true },
            { text: "RE vẫn giữ nguyên ở cực E nối xuống đất vì tụ CE chỉ lọc nhiễu nguồn", correct: false, why: "Lỗi nhầm sang Câu 3 (không có tụ CE): khi có tụ CE song song RE thì RE bị ngắn mạch hoàn toàn về mặt xoay chiều." },
            { text: "RE chuyển sang mắc song song với RC ở ngõ ra", correct: false, why: "Cực E đã bị tụ CE nối đất nên không có dòng tín hiệu nào qua RE nữa." },
            { text: "RE ghép song song với RB ở ngõ vào", correct: false, why: "RE bị tụ CE nối tắt xuống đất nên tổng trở tương đương của cụm (RE // CE) bằng 0 Ω." }
          ],
          explain: "Nhờ tụ thoát CE ngắn mạch ở chế độ AC, cực E được nối đất xoay chiều trực tiếp. Nhờ đó mạch vừa ổn định nhiệt ở DC (nhờ RE), vừa giữ được hệ số khuếch đại áp Ku lớn ở AC!"
        },
        {
          title: "Bước 5/5 · Tính Zv, Zr, Ku, Ki (Câu 2)",
          diagTab: "ac",
          q: "Với RB = 560 kΩ, RC = 2,4 kΩ, re = 11,71 Ω, β = 120 (và RE đã bị nối tắt bởi CE), kết quả Zv, Zr, Ku, Ki là:",
          hints: [
            "Tầng 1: Vì RE bị nối tắt bởi CE nên bộ công thức AC giống hệt Câu 1!",
            "Tầng 2: Zv = RB // β·re; Zr = RC; Ku = −RC / re; Ki ≈ β (vì RB = 560 kΩ ≥ 10·β·re = 14,05 kΩ).",
            "Tầng 3: β·re = 1405,2 Ω → Zv = (560k × 1405,2)/(560k + 1405,2) = 1401,68 Ω; Ku = −2400 / 11,71 = −204,95."
          ],
          options: [
            { text: "Zv = 1401,68 Ω; Zr = 2,4 kΩ; Ku = −204,95; Ki ≈ 120", correct: true },
            { text: "Zv = 52,55 kΩ; Zr = 2,4 kΩ; Ku = −4,98; Ki = 108,8", correct: false, why: "Lỗi vẫn đưa RE = 470 Ω vào công thức xoay chiều dù đề bài có tụ thoát CE." },
            { text: "Zv = 1405,20 Ω; Zr = 2,87 kΩ; Ku = −204,95; Ki ≈ 120", correct: false, why: "Lỗi lấy Zr = RC + RE = 2,87 kΩ và quên ghép song song RB trong Zv." },
            { text: "Zv = 1401,68 Ω; Zr = 2,4 kΩ; Ku = +204,95; Ki ≈ 120", correct: false, why: "Lỗi thiếu dấu trừ (−) trong hệ số khuếch đại điện áp Ku = −RC / re." }
          ],
          explain: "Zv = RB // β·re = 1401,68 Ω; Zr = RC = 2,4 kΩ; Ku = −2400 / 11,71 = −204,95; vì RB = 560 kΩ ≥ 10·β·re (14052 Ω) nên Ki ≈ β = 120."
        }
      ]
    },

    3: {
      id: 3,
      name: "Câu 3: EC Ổn định Emitter không có tụ CE",
      shortType: "3.3 Emitter không có CE",
      topology: "emitter_unbypass",
      hasRE: true,
      hasCE: false,
      specs: "+Ucc = 20 V; RB = 470 kΩ; RC = 2,2 kΩ; RE = 1 kΩ; C1 = C2 = 10 µF; β = 99; UBE = 0,7 V; ro = ∞",
      params: { Ucc: 20, RB: 470, RC: 2.2, RE: 1000, beta: 99, C1: "10 µF", C2: "10 µF" },
      ans: {
        IB: 33.86, IC: 3.35, IE: 3.39, UCE: 9.28,
        ICsat: 6.25, UCEcut: 20,
        re: 7.67, Zb: 99.76, Zv: 82.29, ZvUnit: "kΩ", Zr: 2.2, ZrUnit: "kΩ", Ku: -2.18, Ki: 81.67
      },
      steps: [
        {
          title: "Bước 1/5 · Tính dòng và áp phân cực tĩnh (IB, IC, IE, UCE)",
          diagTab: "dc",
          q: "Với +Ucc = 20 V, RB = 470 kΩ, RC = 2,2 kΩ, RE = 1 kΩ, β = 99, UBE = 0,7 V, giá trị một chiều IB, IC, IE, UCE là:",
          hints: [
            "Tầng 1: Công thức một chiều giống hệt Câu 2 vì ở DC có hay không có tụ CE đều hở mạch như nhau.",
            "Tầng 2: IB = (Ucc − UBE) / [RB + (β + 1)·RE]; UCE = Ucc − IC·(RC + RE).",
            "Tầng 3: IB = (20 − 0,7) / [470k + (99 + 1)·1k] = 19,3 / 570k = 33,86 µA → IC = 3,35 mA; IE = 3,39 mA → UCE = 20 − 3,35·3,2 = 9,28 V."
          ],
          options: [
            { text: "IB = 33,86 µA; IC = 3,35 mA; IE = 3,39 mA; UCE = 9,28 V", correct: true },
            { text: "IB = 40,98 µA; IC = 4,06 mA; IE = 4,10 mA; UCE = 7,01 V", correct: false, why: "Lỗi quên nhân (β + 1) = 100 với RE = 1 kΩ ở mẫu số khi tính IB (bạn chỉ chia cho 471 kΩ)." },
            { text: "IB = 33,86 µA; IC = 3,35 mA; IE = 3,39 mA; UCE = 12,63 V", correct: false, why: "Lỗi quên RE khi tính UCE: bạn chỉ lấy 20 − 3,35 × 2,2 = 12,63 V thay vì trừ IC·(RC + RE)." },
            { text: "IB = 21,69 µA; IC = 2,15 mA; IE = 2,17 mA; UCE = 13,12 V", correct: false, why: "Lỗi cộng cả RC vào mẫu số của IB (nhầm sang phân cực hồi tiếp Collector)." }
          ],
          explain: "IB = (20 − 0,7) / (470·10³ + 100·10³) = 33,86 µA; IC = 99·33,86 µA = 3,35 mA; IE = 100·33,86 µA = 3,39 mA; UCE = 20 − 3,35·(2,2 + 1) = 9,28 V."
        },
        {
          title: "Bước 2/5 · Phương trình đường tải tĩnh & Điểm cắt trục",
          diagTab: "load",
          q: "Phương trình đường tải tĩnh và tọa độ 2 điểm cắt trục của mạch Câu 3 là:",
          hints: [
            "Tầng 1: Đường tải tĩnh đi qua (Ucc; 0) và (0; Ucc / (RC + RE)).",
            "Tầng 2: Thay Ucc = 20 V, RC + RE = 2,2 kΩ + 1 kΩ = 3,2 kΩ.",
            "Tầng 3: Khi UCE = 0 ⇒ IC = 20 / 3,2 kΩ = 6,25 mA."
          ],
          options: [
            { text: "UCE = Ucc − IC(RC + RE); cắt trục tại UCE = 20 V và IC = 6,25 mA", correct: true },
            { text: "UCE = Ucc − IC·RC; cắt trục tại UCE = 20 V và IC = 9,09 mA", correct: false, why: "Lỗi bỏ quên RE = 1 kΩ trong phương trình đường tải tĩnh (lấy 20 / 2,2 = 9,09 mA)." },
            { text: "UCE = Ucc − IC(RC + RE); cắt trục tại UCE = 9,28 V và IC = 3,35 mA", correct: false, why: "Đó là tọa độ điểm làm việc tĩnh Q(9,28 V; 3,35 mA), không phải 2 giao điểm với trục tọa độ." },
            { text: "UCE = Ucc − IC(RC + RE); cắt trục tại UCE = 20 V và IC = 20 mA", correct: false, why: "Lỗi chỉ chia 20 V cho RE = 1 kΩ mà quên cộng RC = 2,2 kΩ." }
          ],
          explain: "UCE = Ucc − IC(RC + RE). Cho IC = 0 → UCE = 20 V; cho UCE = 0 → IC = 20 / (2,2 + 1) = 6,25 mA."
        },
        {
          title: "Bước 3/5 · Điện trở vi phân re và Tổng trở nhìn vào cực B (Zb)",
          diagTab: "ac",
          q: "Vì mạch KHÔNG có tụ CE nên RE vẫn tồn tại trong sơ đồ xoay chiều. Giá trị re và tổng trở nhìn vào cực B (Zb = β(re + RE) theo ký hiệu vở mẫu) là:",
          hints: [
            "Tầng 1: Tính re = UT / IE trước, sau đó tính Zb nhìn vào cực Base khi cực E có RE nối tiếp.",
            "Tầng 2: Theo đúng công thức vở giải mẫu của trường: Zb = β·(re + RE).",
            "Tầng 3: re = 26 / 3,39 = 7,67 Ω ⇒ Zb = 99 × (7,67 + 1000) = 99759,33 Ω ≈ 99,76 kΩ."
          ],
          options: [
            { text: "re = 7,67 Ω; Zb = β(re + RE) = 99,76 kΩ", correct: true },
            { text: "re = 7,67 Ω; Zb = β·re = 759,33 Ω", correct: false, why: "Lỗi quên RE trong sơ đồ xoay chiều: mạch Câu 3 không có tụ CE nên RE không bị nối tắt!" },
            { text: "re = 7,67 Ω; Zb = β·re + RE = 1,76 kΩ", correct: false, why: "Lỗi quên nhân β cho RE khi quy đổi từ cực E về cực B: phải là β(re + RE) chứ không phải β·re + RE." },
            { text: "re = 7,76 Ω; Zb = 176,7 kΩ", correct: false, why: "Lỗi cộng nhầm đơn vị 7,67 kΩ + 1 kΩ thay vì 7,67 Ω + 1000 Ω." }
          ],
          explain: "re = 26 / 3,39 = 7,67 Ω. Do không có tụ CE nên nhìn vào cực B thấy Zb = β(re + RE) = 99·(7,67 + 1000) = 99,76 kΩ (tổng trở vào tăng vọt!)."
        },
        {
          title: "Bước 4/5 · Đặc điểm sơ đồ tương đương xoay chiều khi KHÔNG có tụ CE",
          diagTab: "ac",
          q: "So với Câu 2 (có CE), sơ đồ tương đương xoay chiều của Câu 3 (không có CE) khác ở điểm nào?",
          hints: [
            "Tầng 1: Quan sát cực E của BJT khi không có tụ thoát CE.",
            "Tầng 2: Giữa cực B và nút E là β·re; nguồn dòng β·IB từ cực C cũng đổ vào nút E.",
            "Tầng 3: Từ nút E nối qua điện trở RE xuống đất (thay vì nút E nối đất trực tiếp)."
          ],
          options: [
            { text: "Cực E không nối đất trực tiếp mà nối qua điện trở RE xuống đất; cả dòng IB và nguồn dòng β·IB đều đi qua RE", correct: true },
            { text: "Điện trở RE mắc nối tiếp với RC ở ngõ ra nhưng không ảnh hưởng đến ngõ vào", correct: false, why: "Sai: RE nằm ở nhánh chung (cực E) của cả vòng vào và vòng ra nên tạo hồi tiếp âm dòng điện nối tiếp, làm tăng mạnh Zv." },
            { text: "Điện trở RE mắc song song với RB ở ngõ vào", correct: false, why: "Sai: RE nằm ở cực E, khi nhìn từ cực B vào thì nó nối tiếp với re và được nhân hệ số β." },
            { text: "Sơ đồ xoay chiều hoàn toàn giống Câu 2 vì RE là điện trở phân cực một chiều", correct: false, why: "Sai: điện trở dẫn cả dòng DC lẫn AC nếu không bị tụ CE nối tắt." }
          ],
          explain: "Khi không có tụ CE, điện trở RE nằm giữa nút E và đất trên sơ đồ AC, tạo hồi tiếp âm giúp tăng Zv lên hàng chục kΩ nhưng làm giảm |Ku|."
        },
        {
          title: "Bước 5/5 · Tính thông số xoay chiều Zv, Zr, Ku, Ki (Câu 3)",
          diagTab: "ac",
          q: "Với RB = 470 kΩ, Zb = 99,76 kΩ, RC = 2,2 kΩ, re = 7,67 Ω, RE = 1 kΩ, β = 99, bộ kết quả Zv, Zr, Ku, Ki đúng là:",
          hints: [
            "Tầng 1: Zv = Zb // RB; Zr = RC.",
            "Tầng 2: Ku = −RC / (re + RE); Ki = β·RB / (RB + Zb) (vì Zb = 99,76 kΩ khá lớn so với RB = 470 kΩ nên không xấp xỉ Ki ≈ β được!).",
            "Tầng 3: Zv = (99,76 × 470)/(99,76 + 470) = 82,29 kΩ; Ku = −2200 / (7,67 + 1000) = −2,18; Ki = 99 × 470 / (470 + 99,76) = 81,67."
          ],
          options: [
            { text: "Zv = 82,29 kΩ; Zr = 2,2 kΩ; Ku = −2,18; Ki = 81,67", correct: true },
            { text: "Zv = 82,29 kΩ; Zr = 2,2 kΩ; Ku = −286,83; Ki = 99", correct: false, why: "Hai lỗi: tính Ku = −RC / re quên cộng RE ở mẫu số, và lấy Ki = β = 99 trong khi RB không lớn hơn 10·Zb." },
            { text: "Zv = 99,76 kΩ; Zr = 3,2 kΩ; Ku = −2,18; Ki = 81,67", correct: false, why: "Lỗi quên ghép song song Zb với RB khi tính Zv, và cộng nhầm RE vào Zr." },
            { text: "Zv = 82,29 kΩ; Zr = 2,2 kΩ; Ku = −2,20; Ki = 17,33", correct: false, why: "Lỗi lấy nhầm RB và Zb trên tử số của Ki (lấy β·Zb / (RB + Zb) thay vì β·RB / (RB + Zb))." }
          ],
          explain: "Zv = Zb // RB = 82,29 kΩ; Zr = RC = 2,2 kΩ; Ku = −RC / (re + RE) = −2200 / 1007,67 = −2,18; Ki = β·RB / (RB + Zb) = 81,67."
        }
      ]
    },

    4: {
      id: 4,
      name: "Câu 4: EC Phân cực phân áp có tụ CE",
      shortType: "3.4 Phân áp có CE",
      topology: "divider_bypass",
      hasRE: true,
      hasCE: true,
      specs: "+Ucc = 12 V; R1 = 220 kΩ; R2 = 56 kΩ; RC = 2,2 kΩ; RE = 330 Ω; C1 = C2 = CE = 1 µF; β = 120; UBE = 0,7 V; ro = ∞",
      params: { Ucc: 12, R1: 220, R2: 56, RC: 2.2, RE: 330, beta: 120, C1: "1 µF", C2: "1 µF", CE: "1 µF" },
      ans: {
        Rtd: 44.64, Utd: 2.43,
        IB: 20.46, IC: 2.46, IE: 2.48, UCE: 5.78,
        ICsat: 4.74, UCEcut: 12,
        re: 10.48, Zv: 1.223, ZvUnit: "kΩ", Zr: 2.2, ZrUnit: "kΩ", Ku: -209.92, Ki: 116.71
      },
      steps: [
        {
          title: "Bước 1/5 · Thu gọn Thevenin cực B (Rtđ, Utđ) và tính IB, IC, IE, UCE",
          diagTab: "dc",
          q: "Với cầu phân áp R1 = 220 kΩ (nối Ucc = 12 V) và R2 = 56 kΩ (nối đất), RE = 330 Ω, RC = 2,2 kΩ, β = 120, giá trị Rtđ, Utđ và điểm làm việc một chiều là:",
          hints: [
            "Tầng 1 (Thevenin cực B): Rtđ = R1 // R2 = R1·R2 / (R1 + R2); Utđ = R2·Ucc / (R1 + R2) (lưu ý trên tử là R2 vì R2 nối đất!).",
            "Tầng 2 (Tính dòng): IB = (Utđ − UBE) / [Rtđ + (β + 1)·RE]; IC = β·IB; IE = (β + 1)·IB; UCE = Ucc − IC·(RC + RE).",
            "Tầng 3 (Thay số): Rtđ = 44,64 kΩ; Utđ = 2,43 V → IB = (2,43 − 0,7)/(44,64k + 121·330) = 20,46 µA → IC = 2,46 mA; IE = 2,48 mA; UCE = 5,78 V."
          ],
          options: [
            { text: "Rtđ = 44,64 kΩ; Utđ = 2,43 V; IB = 20,46 µA; IC = 2,46 mA; IE = 2,48 mA; UCE = 5,78 V", correct: true },
            { text: "Rtđ = 44,64 kΩ; Utđ = 9,57 V; IB = 104,88 µA; IC = 12,59 mA (bão hòa)", correct: false, why: "Lỗi kinh điển: lấy nhầm R1 thay vì R2 trên tử số khi tính Utđ = R1·Ucc / (R1 + R2) = 9,57 V!" },
            { text: "Rtđ = 44,64 kΩ; Utđ = 2,43 V; IB = 38,75 µA; IC = 4,65 mA; UCE = 0,24 V", correct: false, why: "Lỗi bỏ qua Rtđ hoặc quên (β + 1)·RE ở mẫu số của IB." },
            { text: "Rtđ = 44,64 kΩ; Utđ = 2,43 V; IB = 20,46 µA; IC = 2,46 mA; UCE = −3,79 V", correct: false, why: "Lỗi thay nhầm Utđ = 2,43 V vào vị trí của Ucc = 12 V khi tính UCE = Ucc − IC(RC + RE)." }
          ],
          explain: "Rtđ = (220×56)/(220+56) = 44,64 kΩ; Utđ = 56×12/276 = 2,43 V; IB = (2,43 − 0,7)/(44640 + 121×330) = 20,46 µA; IC = 2,46 mA; IE = 2,48 mA; UCE = 12 − 2,46·2,53 = 5,78 V."
        },
        {
          title: "Bước 2/5 · Phương trình đường tải tĩnh & Điểm cắt trục (Câu 4)",
          diagTab: "load",
          q: "Phương trình đường tải tĩnh và giao điểm với 2 trục tọa độ của mạch Câu 4 là:",
          hints: [
            "Tầng 1: Cầu phân áp R1, R2 chỉ nằm ở ngõ vào; phương trình vòng ra C-E vẫn là UCE = Ucc − IC(RC + RE).",
            "Tầng 2: Cho IC = 0 → UCE = Ucc = 12 V.",
            "Tầng 3: Cho UCE = 0 → IC = 12 / (2,2 kΩ + 0,33 kΩ) = 12 / 2,53 kΩ = 4,74 mA."
          ],
          options: [
            { text: "UCE = Ucc − IC(RC + RE); cắt trục tại UCE = 12 V và IC = 4,74 mA", correct: true },
            { text: "UCE = Utđ − IC(RC + RE); cắt trục tại UCE = 2,43 V và IC = 0,96 mA", correct: false, why: "Lỗi dùng nhầm điện áp Thevenin cực B (Utđ = 2,43 V) làm nguồn cung cấp cho cực C (phải là Ucc = 12 V)." },
            { text: "UCE = Ucc − IC·RC; cắt trục tại UCE = 12 V và IC = 5,45 mA", correct: false, why: "Lỗi quên cộng RE = 330 Ω vào RC trong phương trình đường tải một chiều." },
            { text: "UCE = Ucc − IC(RC + RE); cắt trục tại UCE = 5,78 V và IC = 2,46 mA", correct: false, why: "Đó là tọa độ điểm làm việc tĩnh Q(5,78 V; 2,46 mA)." }
          ],
          explain: "Đường tải tĩnh: UCE = Ucc − IC(RC + RE). Khi IC = 0 → UCE = 12 V; khi UCE = 0 → IC = 12 / (2200 + 330) = 4,74 mA."
        },
        {
          title: "Bước 3/5 · Điện trở vi phân re (Câu 4)",
          diagTab: "dc",
          q: "Với IE = 2,48 mA và UT = 26 mV, giá trị điện trở vi phân re là:",
          hints: [
            "Tầng 1: Áp dụng re = UT / IE.",
            "Tầng 2: Thay UT = 26 mV, IE = 2,48 mA.",
            "Tầng 3: re = 26 / 2,48 = 10,4838... ≈ 10,48 Ω."
          ],
          options: [
            { text: "re = 10,48 Ω (và β·re = 1,2576 kΩ)", correct: true },
            { text: "re = 10,57 Ω", correct: false, why: "Lỗi chia cho IC = 2,46 mA thay vì chia cho IE = 2,48 mA." },
            { text: "re = 1,27 Ω", correct: false, why: "Lỗi chia cho IB = 20,46 µA." },
            { text: "re = 10,48 kΩ", correct: false, why: "Lỗi đơn vị (mV / mA = Ω)." }
          ],
          explain: "re = UT / IE = 26 / 2,48 = 10,48 Ω ⇒ β·re = 120 × 10,48 = 1257,6 Ω = 1,2576 kΩ."
        },
        {
          title: "Bước 4/5 · Sơ đồ tương đương xoay chiều mạch phân áp có tụ CE",
          diagTab: "ac",
          q: "Trên sơ đồ tương đương xoay chiều của Câu 4, hai điện trở R1, R2 và điện trở RE được biểu diễn như thế nào?",
          hints: [
            "Tầng 1: Nguồn +Ucc nối đất xoay chiều nên đầu trên của R1 được nối xuống đất.",
            "Tầng 2: Do đó R1 và R2 cùng nối giữa cực B và đất ⇒ mắc song song nhau (R1 // R2 = Rtđ).",
            "Tầng 3: Tụ CE nối tắt RE xuống đất nên cực E nối đất trực tiếp (không còn RE)."
          ],
          options: [
            { text: "Ở ngõ vào có R1 // R2 (tức Rtđ) mắc song song với β·re; cực E nối đất trực tiếp (RE bị nối tắt bởi CE)", correct: true },
            { text: "Ở ngõ vào chỉ có R2 // β·re (còn R1 nối với +Ucc nên bị hở mạch)", correct: false, why: "Lỗi rất hay gặp: nguồn +Ucc ở chế độ AC là ngắn mạch xuống đất (không phải hở mạch!), nên R1 mắc song song với R2." },
            { text: "Ở ngõ vào có R1 nối tiếp R2; cực E vẫn còn RE = 330 Ω", correct: false, why: "Sai cả hai: R1 // R2 và RE đã bị tụ CE nối tắt." },
            { text: "Ở ngõ vào có Rtđ // β(re + RE)", correct: false, why: "Đó là sơ đồ của Câu 5 (không có tụ CE). Ở Câu 4 có tụ CE nên RE bị ngắn mạch." }
          ],
          explain: "Khi +Ucc nối đất AC, R1 mắc song song R2 tạo thành Rtđ = R1 // R2 = 44,64 kΩ đứng song song với β·re ở ngõ vào; RE bị nối tắt bởi tụ CE."
        },
        {
          title: "Bước 5/5 · Tính thông số xoay chiều Zv, Zr, Ku, Ki (Câu 4)",
          diagTab: "ac",
          q: "Với Rtđ = 44,64 kΩ, RC = 2,2 kΩ, re = 10,48 Ω, β = 120, các thông số xoay chiều Zv, Zr, Ku, Ki theo đúng lời giải mẫu là:",
          hints: [
            "Tầng 1: Zv = Rtđ // β·re; Zr = RC; Ku = −RC / re.",
            "Tầng 2: Trong Câu 4, Rtđ = 44,64 kΩ được tính chính xác dòng phân nhánh cho Ki: Ki = β·Rtđ / (Rtđ + β·re).",
            "Tầng 3: β·re = 1,2576 kΩ → Zv = (44,64 × 1,2576)/(44,64 + 1,2576) = 1,223 kΩ; Ku = −2200 / 10,48 = −209,92; Ki = 120 × 44,64 / (44,64 + 1,2576) = 116,71."
          ],
          options: [
            { text: "Zv = 1,223 kΩ; Zr = 2,2 kΩ; Ku = −209,92; Ki = 116,71", correct: true },
            { text: "Zv = 1,258 kΩ; Zr = 2,2 kΩ; Ku = −209,92; Ki = 120", correct: false, why: "Lỗi bỏ qua sự phân dòng qua Rtđ = 44,64 kΩ ở ngõ vào (trong vở Câu 4 tính chính xác Zv = 1,223 kΩ và Ki = 116,71)." },
            { text: "Zv = 22,57 kΩ; Zr = 2,2 kΩ; Ku = −6,46; Ki = 68,5", correct: false, why: "Lỗi đưa RE = 330 Ω vào công thức xoay chiều dù mạch có tụ CE." },
            { text: "Zv = 1,223 kΩ; Zr = 2,2 kΩ; Ku = +209,92; Ki = 116,71", correct: false, why: "Lỗi thiếu dấu trừ (−) trong Ku = −RC / re." }
          ],
          explain: "Zv = Rtđ // β·re = 1,223 kΩ; Zr = RC = 2,2 kΩ; Ku = −2200 / 10,48 = −209,92; Ki = β·Rtđ / (Rtđ + β·re) = 116,71."
        }
      ]
    },

    5: {
      id: 5,
      name: "Câu 5: EC Phân cực phân áp không có tụ CE",
      shortType: "3.5 Phân áp không CE",
      topology: "divider_unbypass",
      hasRE: true,
      hasCE: false,
      specs: "+Ucc = 9 V; R1 = 820 kΩ; R2 = 270 kΩ; RC = 3,3 kΩ; RE = 180 Ω; C1 = C2 = 1 µF (không có CE); β = 200; UBE = 0,7 V; ro = ∞",
      params: { Ucc: 9, R1: 820, R2: 270, RC: 3.3, RE: 180, beta: 200, C1: "1 µF", C2: "1 µF" },
      ans: {
        Rtd: 203.12, Utd: 2.23,
        IB: 6.39, IC: 1.28, IE: 1.28, UCE: 4.55,
        ICsat: 2.59, UCEcut: 9,
        re: 20.31, Zb: 40.062, Zv: 33.46, ZvUnit: "kΩ", Zr: 3.3, ZrUnit: "kΩ", Ku: -16.47, Ki: 167.04
      },
      steps: [
        {
          title: "Bước 1/5 · Tính Rtđ, Utđ và điểm làm việc tĩnh IB, IC, IE, UCE (Câu 5)",
          diagTab: "dc",
          q: "Với +Ucc = 9 V, R1 = 820 kΩ, R2 = 270 kΩ, RC = 3,3 kΩ, RE = 180 Ω, β = 200, kết quả phân cực một chiều đúng là:",
          hints: [
            "Tầng 1: Tính Rtđ = R1 // R2 và Utđ = R2·Ucc / (R1 + R2).",
            "Tầng 2: IB = (Utđ − UBE) / [Rtđ + (β + 1)·RE]; IC = β·IB; IE = (β + 1)·IB; UCE = Ucc − IC(RC + RE).",
            "Tầng 3: Rtđ = (820×270)/1090 = 203,12 kΩ; Utđ = 270×9/1090 = 2,23 V → IB = (2,23 − 0,7)/(203,12k + 201×180) = 6,39 µA → IC = 1,28 mA; IE = 1,28 mA; UCE = 4,55 V."
          ],
          options: [
            { text: "Rtđ = 203,12 kΩ; Utđ = 2,23 V; IB = 6,39 µA; IC = 1,28 mA; IE = 1,28 mA; UCE = 4,55 V", correct: true },
            { text: "Rtđ = 203,12 kΩ; Utđ = 6,77 V; IB = 25,37 µA; IC = 5,07 mA", correct: false, why: "Lỗi lấy nhầm R1 = 820 kΩ trên tử số khi tính Utđ (phải lấy R2 = 270 kΩ nối đất)." },
            { text: "Rtđ = 203,12 kΩ; Utđ = 2,23 V; IB = 7,53 µA; IC = 1,51 mA; UCE = 3,75 V", correct: false, why: "Lỗi quên cộng (β + 1)RE = 201 × 180 Ω vào mẫu số khi tính IB." },
            { text: "Rtđ = 203,12 kΩ; Utđ = 2,23 V; IB = 6,39 µA; IC = 1,28 mA; UCE = 4,78 V", correct: false, why: "Lỗi quên cộng RE = 180 Ω vào RC = 3,3 kΩ khi tính UCE = Ucc − IC(RC + RE)." }
          ],
          explain: "Rtđ = 203,12 kΩ; Utđ = 2,23 V; IB = 1,53 / (203120 + 201×180) = 6,39 µA; IC = 200×6,39 µA = 1,28 mA; IE = 201×6,39 µA = 1,28 mA (làm tròn 2 chữ số); UCE = 9 − 1,28·3,48 = 4,55 V."
        },
        {
          title: "Bước 2/5 · Phương trình đường tải tĩnh & Điểm cắt trục (Câu 5)",
          diagTab: "load",
          q: "Phương trình đường tải tĩnh và tọa độ 2 giao điểm cắt trục của mạch Câu 5 là:",
          hints: [
            "Tầng 1: UCE = Ucc − IC(RC + RE) với Ucc = 9 V.",
            "Tầng 2: Khi IC = 0 → UCE = 9 V.",
            "Tầng 3: Khi UCE = 0 → IC = 9 / (3,3·10³ + 180) = 9 / 3480 = 2,59 mA."
          ],
          options: [
            { text: "UCE = Ucc − IC(RC + RE); cắt trục tại UCE = 9 V và IC = 2,59 mA", correct: true },
            { text: "UCE = Ucc − IC·RC; cắt trục tại UCE = 9 V và IC = 2,73 mA", correct: false, why: "Lỗi quên cộng RE = 180 Ω vào mẫu số IC = Ucc / (RC + RE)." },
            { text: "UCE = Ucc − IC(RC + RE); cắt trục tại UCE = 4,55 V và IC = 1,28 mA", correct: false, why: "Đó là tọa độ điểm làm việc tĩnh Q(4,55 V; 1,28 mA)." },
            { text: "UCE = Utđ − IC(RC + RE); cắt trục tại UCE = 2,23 V và IC = 0,64 mA", correct: false, why: "Lỗi dùng Utđ thay vì Ucc = 9 V." }
          ],
          explain: "Đường tải tĩnh: UCE = Ucc − IC(RC + RE). Khi IC = 0 → UCE = 9 V; khi UCE = 0 → IC = 9 / 3,48k = 2,59 mA."
        },
        {
          title: "Bước 3/5 · Tính re và Zb khi KHÔNG có tụ CE (Câu 5)",
          diagTab: "ac",
          q: "Với IE = 1,28 mA, RE = 180 Ω, β = 200, giá trị điện trở vi phân re và tổng trở nhìn vào cực B (Zb = β(re + RE)) là:",
          hints: [
            "Tầng 1: re = UT / IE = 26 / 1,28.",
            "Tầng 2: Do không có tụ CE nên Zb = β·(re + RE).",
            "Tầng 3: re = 20,31 Ω → Zb = 200 × (20,31 + 180) = 200 × 200,31 = 40062 Ω = 40,062 kΩ."
          ],
          options: [
            { text: "re = 20,31 Ω; Zb = 40062 Ω = 40,062 kΩ", correct: true },
            { text: "re = 20,31 Ω; Zb = β·re = 4,062 kΩ", correct: false, why: "Lỗi bỏ quên RE = 180 Ω (mạch Câu 5 không có tụ thoát CE!)." },
            { text: "re = 20,31 Ω; Zb = 220,62 Ω", correct: false, why: "Lỗi quên nhân β = 200 cho tổng (re + RE)." },
            { text: "re = 14,22 Ω; Zb = 38,84 kΩ", correct: false, why: "Lỗi tính sai re (26 / 1,28 = 20,31 Ω)." }
          ],
          explain: "re = 26 / 1,28 = 20,31 Ω; Zb = β(re + RE) = 200 × (20,31 + 180) = 40062 Ω = 40,062 kΩ."
        },
        {
          title: "Bước 4/5 · Cấu trúc sơ đồ tương đương xoay chiều Câu 5",
          diagTab: "ac",
          q: "Sơ đồ tương đương xoay chiều của Câu 5 (Phân áp không có tụ CE) gồm các thành phần nào?",
          hints: [
            "Tầng 1: Kết hợp ngõ vào phân áp (R1 // R2 = Rtđ) của Câu 4 với nhánh Emitter không có tụ CE của Câu 3.",
            "Tầng 2: Nhánh cực B nhìn vào thấy Zb = β(re + RE) mắc song song với Rtđ.",
            "Tầng 3: Nhánh ra gồm nguồn dòng β·IB song song ro và RC."
          ],
          options: [
            { text: "Ngõ vào có Rtđ = R1 // R2 mắc song song với nhánh Zb (gồm β·re nối tiếp RE xuống đất); ngõ ra có RC", correct: true },
            { text: "Ngõ vào có Rtđ // β·re (cực E nối đất trực tiếp vì RE bị nối tắt)", correct: false, why: "Sai: Câu 5 là mạch phân áp KHÔNG có tụ CE nên RE vẫn giữ nguyên ở cực E." },
            { text: "Ngõ vào chỉ có R2 // Zb vì R1 nối lên nguồn +Ucc", correct: false, why: "Sai: +Ucc nối đất xoay chiều nên cả R1 và R2 đều mắc song song từ cực B xuống đất." },
            { text: "Điện trở RE mắc song song với RC ở ngõ ra", correct: false, why: "Sai: RE nằm ở cực E, nối từ nút giữa β·re và nguồn dòng β·IB xuống đất." }
          ],
          explain: "Trên sơ đồ AC Câu 5: Rtđ = R1 // R2 mắc song song với nhánh Zb = β(re + RE); ngõ ra Zr = RC."
        },
        {
          title: "Bước 5/5 · Tính Zv, Zr, Ku, Ki (Câu 5)",
          diagTab: "ac",
          q: "Với Rtđ = 203,12 kΩ, Zb = 40,062 kΩ, RC = 3,3 kΩ, re = 20,31 Ω, RE = 180 Ω, kết quả Zv, Zr, Ku, Ki trong vở mẫu là:",
          hints: [
            "Tầng 1: Zv = Rtđ // Zb = (203,12 × 40,062) / (203,12 + 40,062); Zr = RC = 3,3 kΩ.",
            "Tầng 2: Ku = −RC / (re + RE); Ki = Zv / (re + RE) (tương đương với β·Rtđ / (Rtđ + Zb)).",
            "Tầng 3: Zv = 33,46 kΩ; Ku = −3300 / (20,31 + 180) = −16,47; Ki = 33,46·10³ / (20,31 + 180) = 167,04."
          ],
          options: [
            { text: "Zv = 33,46 kΩ; Zr = 3,3 kΩ; Ku = −16,47; Ki = 167,04", correct: true },
            { text: "Zv = 3,98 kΩ; Zr = 3,3 kΩ; Ku = −162,48; Ki = 196,13", correct: false, why: "Lỗi bỏ quên RE = 180 Ω khi tính Zb, Ku, Ki." },
            { text: "Zv = 243,18 kΩ; Zr = 3,3 kΩ; Ku = −16,47; Ki = 200", correct: false, why: "Lỗi cộng nối tiếp Rtđ + Zb thay vì tính song song Rtđ // Zb." },
            { text: "Zv = 33,46 kΩ; Zr = 3,3 kΩ; Ku = +16,47; Ki = 167,04", correct: false, why: "Lỗi quên dấu trừ (−) trong Ku." }
          ],
          explain: "Zv = Rtđ // Zb = 33,46 kΩ; Zr = RC = 3,3 kΩ; Ku = −3300 / 200,31 = −16,47; Ki = Zv / (re + RE) = 33460 / 200,31 = 167,04."
        }
      ]
    },

    6: {
      id: 6,
      name: "Câu 6: Hồi tiếp AC từ cực C có tụ CE",
      shortType: "3.6 Hồi tiếp từ cực C",
      topology: "collector_feedback",
      hasRE: true,
      hasCE: true,
      specs: "+Ucc = 15 V; RB = 680 kΩ; RC = 2,2 kΩ; RE = 330 Ω; C1 = C2 = CE = 1 µF; β = 150; UBE = 0,7 V; ro = ∞",
      params: { Ucc: 15, RB: 680, RC: 2.2, RE: 330, beta: 150, C1: "1 µF", C2: "1 µF", CE: "1 µF" },
      ans: {
        IB: 13.50, IC: 2.03, IE: 2.04, UCE: 9.86,
        ICsat: 5.93, UCEcut: 15,
        re: 12.75, Zv: 1287.62, ZvUnit: "Ω", Zr: 2.19, ZrUnit: "kΩ", Ku: -172.55, Ki: 309.09
      },
      steps: [
        {
          title: "Bước 1/5 · Tính dòng và áp phân cực tĩnh mạch hồi tiếp cực C (Câu 6)",
          diagTab: "dc",
          q: "Trong mạch phân cực hồi tiếp từ cực C (RB = 680 kΩ nối từ cực C về cực B), theo đúng công thức lời giải mẫu: IB = (Ucc − UBE) / [RB + β(RC + RE)], bộ giá trị một chiều là:",
          hints: [
            "Tầng 1 (Nhận diện): Điện trở RB lấy điện áp từ dưới RC (cực C) chứ không nối trực tiếp lên +Ucc, nên dòng qua RC và RE đều ảnh hưởng tới IB.",
            "Tầng 2 (Công thức vở mẫu): IB = (Ucc − UBE) / [RB + β(RC + RE)]; IC = β·IB; IE = (β + 1)·IB; UCE = Ucc − IC(RC + RE).",
            "Tầng 3 (Thay số): IB = (15 − 0,7) / [680k + 150·(2,2k + 330)] = 14,3 / 1059,5k = 13,50 µA → IC = 2,03 mA; IE = 2,04 mA; UCE = 9,86 V."
          ],
          options: [
            { text: "IB = 13,50 µA; IC = 2,03 mA; IE = 2,04 mA; UCE = 9,86 V", correct: true },
            { text: "IB = 19,60 µA; IC = 2,94 mA; IE = 2,96 mA; UCE = 7,56 V", correct: false, why: "Lỗi bỏ quên RC trong mẫu số của IB (bạn đã tính như mạch phân cực Emitter thông thường: chia cho RB + β·RE)." },
            { text: "IB = 21,03 µA; IC = 3,15 mA; IE = 3,18 mA; UCE = 7,03 V", correct: false, why: "Lỗi tính IB = (Ucc − UBE) / RB như mạch phân cực cố định (quên cả RC và RE)." },
            { text: "IB = 13,50 µA; IC = 2,03 mA; IE = 2,04 mA; UCE = 10,53 V", correct: false, why: "Lỗi quên cộng RE = 330 Ω khi tính UCE = Ucc − IC(RC + RE)." }
          ],
          explain: "IB = (15 − 0,7) / [680·10³ + 150·(2200 + 330)] = 13,50 µA; IC = 150·13,50 µA = 2,03 mA; IE = 151·13,50 µA = 2,04 mA; UCE = 15 − 2,03·2,53 = 9,86 V."
        },
        {
          title: "Bước 2/5 · Phương trình đường tải tĩnh & Điểm cắt trục (Câu 6)",
          diagTab: "load",
          q: "Phương trình đường tải tĩnh và tọa độ 2 điểm cắt trục của mạch Câu 6 là:",
          hints: [
            "Tầng 1: Phương trình đường tải tĩnh trong vở: UCE = Ucc − IC(RC + RE).",
            "Tầng 2: Cho IC = 0 → UCE = Ucc = 15 V.",
            "Tầng 3: Cho UCE = 0 → IC = 15 / (2,2·10³ + 330) = 15 / 2530 = 5,93 mA."
          ],
          options: [
            { text: "UCE = Ucc − IC(RC + RE); cắt trục tại UCE = 15 V và IC = 5,93 mA", correct: true },
            { text: "UCE = Ucc − IC·RC; cắt trục tại UCE = 15 V và IC = 6,82 mA", correct: false, why: "Lỗi quên RE = 330 Ω trong phương trình đường tải một chiều." },
            { text: "UCE = Ucc − IC(RC + RE); cắt trục tại UCE = 9,86 V và IC = 2,03 mA", correct: false, why: "Đó là tọa độ điểm làm việc tĩnh Q(9,86 V; 2,03 mA)." },
            { text: "UCE = Ucc − IC(RB + RC + RE); cắt trục tại UCE = 15 V và IC = 0,022 mA", correct: false, why: "Lỗi cộng nhầm RB = 680 kΩ vào tổng trở đường tải C-E." }
          ],
          explain: "UCE = Ucc − IC(RC + RE). Khi IC = 0 → UCE = 15 V; khi UCE = 0 → IC = 15 / (2200 + 330) = 5,93 mA."
        },
        {
          title: "Bước 3/5 · Điện trở vi phân re (Câu 6)",
          diagTab: "dc",
          q: "Với IE = 2,04 mA và UT = 26 mV, giá trị điện trở vi phân re của BJT ở Câu 6 là:",
          hints: [
            "Tầng 1: re = UT / IE.",
            "Tầng 2: Thay UT = 26 mV, IE = 2,04 mA.",
            "Tầng 3: 26 / 2,04 = 12,745... ≈ 12,75 Ω."
          ],
          options: [
            { text: "re = 12,75 Ω", correct: true },
            { text: "re = 12,81 Ω", correct: false, why: "Lỗi chia cho IC = 2,03 mA thay vì chia cho IE = 2,04 mA." },
            { text: "re = 1,93 Ω", correct: false, why: "Lỗi chia cho IB = 13,50 µA." },
            { text: "re = 53,04 Ω", correct: false, why: "Lỗi nhân 26 × 2,04 thay vì chia." }
          ],
          explain: "re = UT / IE = 26 / 2,04 = 12,75 Ω."
        },
        {
          title: "Bước 4/5 · Sơ đồ tương đương xoay chiều mạch hồi tiếp từ cực C",
          diagTab: "ac",
          q: "Điểm khác biệt quan trọng nhất trên sơ đồ tương đương xoay chiều của Câu 6 (so với Câu 1 và Câu 2) là gì?",
          hints: [
            "Tầng 1: Xem hai đầu của điện trở RB nối đi đâu trong mạch gốc.",
            "Tầng 2: RB nối giữa cực B và cực C (không nối trực tiếp lên +Ucc).",
            "Tầng 3: Vì vậy trên sơ đồ xoay chiều, RB không nối xuống đất mà nằm bắc cầu ngang từ nút B sang nút C (tạo dòng hồi tiếp I')!"
          ],
          options: [
            { text: "Điện trở RB không nối xuống đất mà mắc bắc cầu giữa cực B (ngõ vào) và cực C (ngõ ra); RE bị nối tắt bởi CE", correct: true },
            { text: "Điện trở RB nối từ cực B xuống đất song song với β·re như Câu 2", correct: false, why: "Lỗi vẽ nhầm sang mạch phân cực cố định: ở Câu 6, RB nối vào cực C chứ không nối vào +Ucc!" },
            { text: "Cả RB và RC đều mắc song song ở ngõ vào", correct: false, why: "Sai: RC vẫn ở ngõ ra nối từ cực C xuống đất, còn RB nối giữa B và C." },
            { text: "Điện trở RE = 330 Ω vẫn còn ở cực E", correct: false, why: "Sai: Câu 6 có tụ thoát CE = 1 µF mắc song song với RE nên RE bị nối tắt ở chế độ xoay chiều." }
          ],
          explain: "Trên sơ đồ AC Câu 6, RB nối giữa nút B và nút C tạo nhánh hồi tiếp âm điện áp từ ngõ ra về ngõ vào."
        },
        {
          title: "Bước 5/5 · Tính Zv, Zr, Ku, Ki theo công thức vở mẫu (Câu 6)",
          diagTab: "ac",
          q: "Theo đúng bộ công thức của vở lời giải mẫu cho Câu 6: Zv = re / (1/β + RC/RB), Zr = RC // RB, Ku = −RC / re, Ki = RB / RC, bộ kết quả số là:",
          hints: [
            "Tầng 1: Do hiệu ứng hồi tiếp từ cực C qua RB, tổng trở vào tính theo công thức Zv = re / (1/β + RC/RB).",
            "Tầng 2: Tổng trở ra Zr = RC // RB = (2,2 × 680) / (2,2 + 680); hệ số KĐ áp Ku = −RC / re; hệ số KĐ dòng trong vở mẫu dùng công thức Ki = RB / RC.",
            "Tầng 3: Zv = 12,75 / (1/150 + 2,2/680) = 1287,62 Ω; Zr = 2,19 kΩ; Ku = −2200 / 12,75 = −172,55; Ki = 680 / 2,2 = 309,09."
          ],
          options: [
            { text: "Zv = 1287,62 Ω; Zr = 2,19 kΩ; Ku = −172,55; Ki = 309,09", correct: true },
            { text: "Zv = 1907,14 Ω; Zr = 2,20 kΩ; Ku = −172,55; Ki = 150", correct: false, why: "Lỗi dùng nhầm công thức Zv = RB // β·re và Ki = β của mạch phân cực cố định (quên hiệu ứng Miller của nhánh hồi tiếp RB)." },
            { text: "Zv = 1287,62 Ω; Zr = 682,2 kΩ; Ku = −172,55; Ki = 309,09", correct: false, why: "Lỗi cộng nối tiếp RC + RB thay vì tính song song RC // RB khi tìm Zr." },
            { text: "Zv = 3939,7 Ω; Zr = 2,19 kΩ; Ku = +172,55; Ki = 0,0032", correct: false, why: "Lỗi quên cộng 1/β ở mẫu số của Zv, quên dấu trừ trong Ku, và đảo ngược phân số RC/RB khi tính Ki." }
          ],
          explain: "Zv = 12,75 / (1/150 + 2,2/680) = 1287,62 Ω; Zr = RC // RB = 2,19 kΩ; Ku = −2200 / 12,75 = −172,55; Ki = RB / RC = 680 / 2,2 = 309,09."
        }
      ]
    }
  };

  window.PROBLEMS_BAI3 = PROBLEMS;

  // Persistent state in localStorage
  const saved = JSON.parse(localStorage.getItem("ktdt_bai3_state") || "{}");
  const state = {
    probId: saved.probId || 1,
    mode: "quiz",
    stepIdx: 0,
    diagTab: "dc",
    revealDiag: false,
    hintLevel: 0,
    xp: saved.xp || 0,
    combo: saved.combo || 0,
    completedSteps: saved.completedSteps || { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
    mistakes: saved.mistakes || [],
    twinData: null
  };

  function saveState() {
    localStorage.setItem("ktdt_bai3_state", JSON.stringify({
      probId: state.probId,
      xp: state.xp,
      combo: state.combo,
      completedSteps: state.completedSteps,
      mistakes: state.mistakes
    }));
  }

  function renderCircuitSVG(p, customParams) {
    const prm = customParams || p.params;
    const isDivider = p.topology.startsWith("divider");
    const isFeedback = p.topology === "collector_feedback";
    const hasRE = p.hasRE;
    const hasCE = p.hasCE;

    const rbLabel = isDivider ? `R1=${prm.R1}k` : `RB=${prm.RB}k`;
    const r2Label = isDivider ? `R2=${prm.R2}k` : "";
    const rcLabel = `RC=${prm.RC}k`;
    const reLabel = hasRE ? `RE=${prm.RE >= 1000 ? (prm.RE / 1000) + "k" : prm.RE + "Ω"}` : "";

    return `
    <svg viewBox="0 0 380 265" class="svg-diagram">
      <line x1="120" y1="22" x2="250" y2="22" stroke-width="2"/>
      <circle cx="195" cy="22" r="3" fill="currentColor"/>
      <text x="205" y="17" font-size="13" font-weight="bold">+Ucc (${prm.Ucc}V)</text>

      <line x1="210" y1="22" x2="210" y2="42" stroke-width="2"/>
      <line x1="196" y1="28" x2="196" y2="46" stroke-width="1.5"/>
      <polygon points="196,49 193,43 199,43" fill="currentColor"/>
      <text x="176" y="42" font-size="12" font-style="italic">Ir</text>
      <polyline points="210,42 216,46 204,54 216,62 204,70 216,78 210,82" fill="none" stroke-width="2"/>
      <text x="222" y="66" font-size="12" font-weight="600">${rcLabel}</text>
      <line x1="210" y1="82" x2="210" y2="115" stroke-width="2"/>

      ${!isFeedback ? `
        <line x1="120" y1="22" x2="120" y2="45" stroke-width="2"/>
        <polyline points="120,45 126,49 114,57 126,65 114,73 126,81 120,85" fill="none" stroke-width="2"/>
        <text x="130" y="69" font-size="12" font-weight="600">${rbLabel}</text>
        <line x1="120" y1="85" x2="120" y2="132" stroke-width="2"/>
      ` : `
        <circle cx="210" cy="96" r="3" fill="currentColor"/>
        <line x1="210" y1="96" x2="182" y2="96" stroke-width="2"/>
        <polyline points="182,96 178,90 170,102 162,90 154,102 146,90 142,96" fill="none" stroke-width="2"/>
        <text x="136" y="84" font-size="12" font-weight="600">${rbLabel}</text>
        <line x1="142" y1="96" x2="120" y2="96" stroke-width="2"/>
        <line x1="120" y1="96" x2="120" y2="132" stroke-width="2"/>
      `}

      ${isDivider ? `
        <line x1="120" y1="132" x2="120" y2="162" stroke-width="2"/>
        <polyline points="120,162 126,166 114,174 126,182 114,190 126,198 120,202" fill="none" stroke-width="2"/>
        <text x="130" y="186" font-size="12" font-weight="600">${r2Label}</text>
        <line x1="120" y1="202" x2="120" y2="232" stroke-width="2"/>
      ` : ``}

      <circle cx="25" cy="132" r="3" fill="none" stroke-width="2"/>
      <line x1="28" y1="132" x2="68" y2="132" stroke-width="2"/>
      <line x1="32" y1="120" x2="54" y2="120" stroke-width="1.5"/>
      <polygon points="57,120 51,117 51,123" fill="currentColor"/>
      <text x="36" y="114" font-size="12" font-style="italic">Iv</text>
      <line x1="68" y1="120" x2="68" y2="144" stroke-width="2.2"/>
      <line x1="75" y1="120" x2="75" y2="144" stroke-width="2.2"/>
      <text x="60" y="114" font-size="12">C1</text>
      <line x1="75" y1="132" x2="178" y2="132" stroke-width="2"/>
      <circle cx="120" cy="132" r="3" fill="currentColor"/>

      <line x1="178" y1="112" x2="178" y2="152" stroke-width="3"/>
      <line x1="178" y1="124" x2="210" y2="112" stroke-width="2"/>
      <line x1="178" y1="140" x2="210" y2="152" stroke-width="2"/>
      <polygon points="208,151 198,151 203,143" fill="currentColor"/>
      <text x="218" y="138" font-size="13" font-weight="bold">Q (β=${prm.beta})</text>

      <circle cx="210" cy="105" r="3" fill="currentColor"/>
      <line x1="210" y1="105" x2="275" y2="105" stroke-width="2"/>
      <line x1="275" y1="93" x2="275" y2="117" stroke-width="2.2"/>
      <line x1="282" y1="93" x2="282" y2="117" stroke-width="2.2"/>
      <text x="270" y="88" font-size="12">C2</text>
      <line x1="282" y1="105" x2="345" y2="105" stroke-width="2"/>
      <circle cx="348" cy="105" r="3" fill="none" stroke-width="2"/>

      ${!hasRE ? `
        <line x1="210" y1="152" x2="210" y2="232" stroke-width="2"/>
      ` : `
        <line x1="210" y1="152" x2="210" y2="166" stroke-width="2"/>
        <polyline points="210,166 216,170 204,178 216,186 204,194 216,202 210,206" fill="none" stroke-width="2"/>
        <text x="150" y="192" font-size="12" font-weight="600">${reLabel}</text>
        <line x1="210" y1="206" x2="210" y2="232" stroke-width="2"/>
        ${hasCE ? `
          <circle cx="210" cy="158" r="2.5" fill="currentColor"/>
          <line x1="210" y1="158" x2="262" y2="158" stroke-width="1.8"/>
          <line x1="262" y1="158" x2="262" y2="182" stroke-width="1.8"/>
          <line x1="251" y1="182" x2="273" y2="182" stroke-width="2.2"/>
          <line x1="251" y1="189" x2="273" y2="189" stroke-width="2.2"/>
          <text x="277" y="189" font-size="12" font-weight="600">CE</text>
          <line x1="262" y1="189" x2="262" y2="232" stroke-width="1.8"/>
          <circle cx="262" cy="232" r="2.5" fill="currentColor"/>
        ` : ``}
      `}

      <line x1="25" y1="232" x2="348" y2="232" stroke-width="2"/>
      <circle cx="25" cy="232" r="3" fill="none" stroke-width="2"/>
      <circle cx="348" cy="232" r="3" fill="none" stroke-width="2"/>
      <line x1="210" y1="232" x2="210" y2="242" stroke-width="2"/>
      <line x1="196" y1="242" x2="224" y2="242" stroke-width="2"/>
      <line x1="201" y1="247" x2="219" y2="247" stroke-width="2"/>
      <line x1="206" y1="252" x2="214" y2="252" stroke-width="2"/>

      <line x1="25" y1="142" x2="25" y2="222" stroke-width="1.2" stroke-dasharray="3,3"/>
      <text x="32" y="188" font-size="12" font-style="italic">Uv</text>
      <line x1="348" y1="115" x2="348" y2="222" stroke-width="1.2" stroke-dasharray="3,3"/>
      <text x="325" y="175" font-size="12" font-style="italic">Ur</text>
    </svg>`;
  }

  function renderLoadLineSVG(p, showValues, customAns) {
    const a = customAns || p.ans;
    const doneStep2 = showValues || (state.completedSteps[p.id] && state.completedSteps[p.id][1]) || state.mode !== "quiz";
    const icSatTxt = doneStep2 ? `${a.ICsat}` : "?";
    const uceCutTxt = doneStep2 ? `${a.UCEcut}` : "?";
    const icQTxt = doneStep2 ? `${a.IC}` : "ICQ";
    const uceQTxt = doneStep2 ? `${Number(a.UCE).toFixed(2)}` : "UCEQ";

    return `
    <svg viewBox="0 0 340 245" class="svg-diagram">
      <line x1="55" y1="205" x2="305" y2="205" stroke-width="2"/>
      <polygon points="308,205 300,201 300,209" fill="currentColor"/>
      <line x1="55" y1="215" x2="55" y2="22" stroke-width="2"/>
      <polygon points="55,18 51,26 59,26" fill="currentColor"/>

      <text x="63" y="26" font-size="13" font-weight="bold">IC (mA)</text>
      <text x="275" y="226" font-size="13" font-weight="bold">UCE (V)</text>
      <text x="40" y="220" font-size="12">0</text>

      <line x1="55" y1="55" x2="265" y2="205" stroke-width="2.5"/>

      <circle cx="165" cy="133" r="4.5" fill="currentColor"/>
      <text x="173" y="128" font-size="13" font-weight="bold">Q</text>

      <line x1="55" y1="133" x2="165" y2="133" stroke-width="1.5" stroke-dasharray="4,4"/>
      <line x1="165" y1="133" x2="165" y2="205" stroke-width="1.5" stroke-dasharray="4,4"/>

      <text x="14" y="60" font-size="12" font-weight="bold">${icSatTxt}</text>
      <text x="14" y="137" font-size="12" font-weight="600">${icQTxt}</text>
      <text x="148" y="224" font-size="12" font-weight="600">${uceQTxt}</text>
      <text x="255" y="224" font-size="12" font-weight="bold">${uceCutTxt}</text>

      <text x="105" y="42" font-size="12" font-style="italic">
        ${p.hasRE ? "UCE = Ucc − IC(RC + RE)" : "UCE = Ucc − IC·RC"}
      </text>
    </svg>`;
  }

  function renderACModelSVG(p) {
    const isDivider = p.topology.startsWith("divider");
    const isFeedback = p.topology === "collector_feedback";
    const unbypassedRE = p.hasRE && !p.hasCE;

    if (isFeedback) {
      return `
      <svg viewBox="0 0 390 240" class="svg-diagram">
        <circle cx="24" cy="65" r="3" fill="none" stroke-width="2"/>
        <line x1="27" y1="65" x2="135" y2="65" stroke-width="2"/>
        <polyline points="135,65 142,58 152,72 162,58 172,72 182,58 188,65" fill="none" stroke-width="2"/>
        <text x="150" y="50" font-size="12" font-weight="bold">RB (Hồi tiếp)</text>
        <line x1="188" y1="65" x2="355" y2="65" stroke-width="2"/>
        <circle cx="358" cy="65" r="3" fill="none" stroke-width="2"/>

        <circle cx="110" cy="65" r="3" fill="currentColor"/>
        <line x1="110" y1="65" x2="110" y2="105" stroke-width="2"/>
        <polyline points="110,105 116,110 104,118 116,126 104,134 116,142 110,147" fill="none" stroke-width="2"/>
        <text x="120" y="132" font-size="12" font-weight="bold">β·re</text>
        <line x1="110" y1="147" x2="110" y2="195" stroke-width="2"/>

        <circle cx="235" cy="65" r="3" fill="currentColor"/>
        <line x1="235" y1="65" x2="235" y2="108" stroke-width="2"/>
        <circle cx="235" cy="126" r="16" fill="none" stroke-width="2"/>
        <line x1="235" y1="114" x2="235" y2="134" stroke-width="2"/>
        <polygon points="235,138 231,131 239,131" fill="currentColor"/>
        <text x="255" y="130" font-size="12" font-weight="bold">β·IB</text>
        <line x1="235" y1="142" x2="235" y2="195" stroke-width="2"/>

        <circle cx="310" cy="65" r="3" fill="currentColor"/>
        <line x1="310" y1="65" x2="310" y2="105" stroke-width="2"/>
        <polyline points="310,105 316,110 304,118 316,126 304,134 316,142 310,147" fill="none" stroke-width="2"/>
        <text x="320" y="132" font-size="12" font-weight="bold">RC</text>
        <line x1="310" y1="147" x2="310" y2="195" stroke-width="2"/>

        <line x1="24" y1="195" x2="358" y2="195" stroke-width="2"/>
        <circle cx="24" cy="195" r="3" fill="none" stroke-width="2"/>
        <circle cx="358" cy="195" r="3" fill="none" stroke-width="2"/>
        <line x1="235" y1="195" x2="235" y2="206" stroke-width="2"/>
        <line x1="222" y1="206" x2="248" y2="206" stroke-width="2"/>
        <line x1="227" y1="211" x2="243" y2="211" stroke-width="2"/>

        <text x="18" y="135" font-size="12" font-style="italic">Uv</text>
        <text x="362" y="135" font-size="12" font-style="italic">Ur</text>
        <text x="52" y="185" font-size="12" font-weight="600">Zv →</text>
        <text x="315" y="185" font-size="12" font-weight="600">← Zr</text>
      </svg>`;
    }

    return `
    <svg viewBox="0 0 390 245" class="svg-diagram">
      <circle cx="22" cy="52" r="3" fill="none" stroke-width="2"/>
      <line x1="25" y1="52" x2="175" y2="52" stroke-width="2"/>
      <text x="32" y="42" font-size="12" font-style="italic">Iv →</text>

      <circle cx="82" cy="52" r="3" fill="currentColor"/>
      <line x1="82" y1="52" x2="82" y2="95" stroke-width="2"/>
      <polyline points="82,95 88,100 76,108 88,116 76,124 88,132 82,137" fill="none" stroke-width="2"/>
      <text x="92" y="118" font-size="12" font-weight="bold">${isDivider ? "Rtđ (R1//R2)" : "RB"}</text>
      <line x1="82" y1="137" x2="82" y2="200" stroke-width="2"/>

      <line x1="175" y1="52" x2="175" y2="75" stroke-width="2"/>
      <polyline points="175,75 181,80 169,88 181,96 169,104 181,112 175,117" fill="none" stroke-width="2"/>
      <text x="184" y="98" font-size="12" font-weight="bold">β·re</text>
      <line x1="175" y1="117" x2="175" y2="138" stroke-width="2"/>

      <line x1="245" y1="52" x2="355" y2="52" stroke-width="2"/>
      <circle cx="358" cy="52" r="3" fill="none" stroke-width="2"/>
      <line x1="245" y1="52" x2="245" y2="78" stroke-width="2"/>
      <circle cx="245" cy="96" r="16" fill="none" stroke-width="2"/>
      <line x1="245" y1="84" x2="245" y2="104" stroke-width="2"/>
      <polygon points="245,108 241,101 249,101" fill="currentColor"/>
      <text x="264" y="100" font-size="12" font-weight="bold">β·IB</text>
      <line x1="245" y1="112" x2="245" y2="138" stroke-width="2"/>

      ${unbypassedRE ? `
        <line x1="175" y1="138" x2="245" y2="138" stroke-width="2"/>
        <circle cx="210" cy="138" r="3" fill="currentColor"/>
        <text x="206" y="131" font-size="12" font-weight="bold">E</text>
        <line x1="210" y1="138" x2="210" y2="148" stroke-width="2"/>
        <polyline points="210,148 216,152 204,160 216,168 204,176 216,184 210,188" fill="none" stroke-width="2"/>
        <text x="220" y="172" font-size="12" font-weight="bold">RE</text>
        <line x1="210" y1="188" x2="210" y2="200" stroke-width="2"/>
        <text x="135" y="188" font-size="12" font-weight="600">Zb →</text>
      ` : `
        <line x1="175" y1="138" x2="175" y2="200" stroke-width="2"/>
        <line x1="245" y1="138" x2="245" y2="200" stroke-width="2"/>
      `}

      <circle cx="315" cy="52" r="3" fill="currentColor"/>
      <line x1="315" y1="52" x2="315" y2="95" stroke-width="2"/>
      <polyline points="315,95 321,100 309,108 321,116 309,124 321,132 315,137" fill="none" stroke-width="2"/>
      <text x="324" y="118" font-size="12" font-weight="bold">RC</text>
      <line x1="315" y1="137" x2="315" y2="200" stroke-width="2"/>

      <line x1="22" y1="200" x2="358" y2="200" stroke-width="2"/>
      <circle cx="22" cy="200" r="3" fill="none" stroke-width="2"/>
      <circle cx="358" cy="200" r="3" fill="none" stroke-width="2"/>
      <line x1="210" y1="200" x2="210" y2="210" stroke-width="2"/>
      <line x1="196" y1="210" x2="224" y2="210" stroke-width="2"/>
      <line x1="201" y1="215" x2="219" y2="215" stroke-width="2"/>

      <text x="16" y="130" font-size="12" font-style="italic">Uv</text>
      <text x="362" y="130" font-size="12" font-style="italic">Ur</text>
      <text x="42" y="188" font-size="12" font-weight="600">Zv →</text>
      <text x="320" y="188" font-size="12" font-weight="600">← Zr</text>
    </svg>`;
  }

  function renderDiagramArea() {
    const p = PROBLEMS[state.probId];
    const container = document.getElementById("diagram-container");
    const specsBar = document.getElementById("specs-bar");
    if (!container) return;

    ["dc", "load", "ac", "notebook", "fullpage"].forEach(t => {
      const btn = document.getElementById("dtab-" + t);
      if (!btn) return;
      btn.className = state.diagTab === t ? "pill-btn active" : "pill-btn";
    });

    const customParams = (state.mode === "twin" && state.twinData) ? state.twinData.params : null;
    const customAns = (state.mode === "twin" && state.twinData) ? state.twinData.ans : null;

    if (state.diagTab === "dc") {
      container.innerHTML = renderCircuitSVG(p, customParams);
    } else if (state.diagTab === "load") {
      container.innerHTML = renderLoadLineSVG(p, state.revealDiag, customAns);
    } else if (state.diagTab === "ac") {
      const doneStep4 = state.revealDiag || (state.completedSteps[p.id] && state.completedSteps[p.id][3]) || state.mode !== "quiz";
      if (!doneStep4 && state.stepIdx === 3) {
        container.innerHTML = `
          <div style="text-align:center; padding: 1.25rem;">
            <p style="font-weight:700; margin-bottom:0.4rem;">🔍 Bước 4: Nhận diện sơ đồ xoay chiều</p>
            <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:0.75rem;">
              Hãy trả lời câu hỏi Bước 4 bên phải hoặc bấm nút bên dưới để mở khóa sơ đồ tương đương xoay chiều chuẩn!
            </p>
            <button onclick="toggleRevealDiagram()" class="btn">Mở xem sơ đồ AC ngay</button>
          </div>`;
      } else {
        container.innerHTML = renderACModelSVG(p);
      }
    } else if (state.diagTab === "notebook") {
      const crops = (window.NOTEBOOK_CROPS || {})[String(p.id)];
      if (crops) {
        container.innerHTML = `
          <div style="width:100%; text-align:center;">
            <div style="display:flex; justify-content:center; gap:0.4rem; margin-bottom:0.6rem;">
              <button onclick="showNotebookCrop('dc')" class="btn">Hình mạch gốc</button>
              <button onclick="showNotebookCrop('load')" class="btn">Đường tải gốc</button>
              <button onclick="showNotebookCrop('ac')" class="btn">Mạch AC gốc</button>
            </div>
            <img id="notebook-crop-img" src="${crops.dc}" alt="Ảnh cắt từ vở gốc" style="max-height:240px; max-width:100%; border-radius:8px; border:1px solid var(--border-color);"/>
          </div>`;
      }
    } else if (state.diagTab === "fullpage") {
      const pageUrl = (window.ASSETS_BASE || "../../assets") + `/pages/page-${p.id}.jpg`;
      container.innerHTML = `
        <div style="width:100%; text-align:center;">
          <p style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:0.45rem;">Trang ${p.id}/6 trong file <b>bài tập 3.pdf</b> (Bấm vào ảnh để phóng to):</p>
          <a href="${pageUrl}" target="_blank" rel="noopener">
            <img src="${pageUrl}" alt="Toàn trang vở Câu ${p.id}" style="max-height:340px; max-width:100%; border-radius:8px; border:1px solid var(--border-color);"/>
          </a>
        </div>`;
    }

    if (specsBar) {
      specsBar.innerHTML = `<strong>Thông số đề:</strong> ${
        (state.mode === "twin" && state.twinData) ? state.twinData.specsText : p.specs
      }`;
    }
  }

  window.showNotebookCrop = function (kind) {
    const crops = (window.NOTEBOOK_CROPS || {})[String(state.probId)];
    const img = document.getElementById("notebook-crop-img");
    if (crops && img && crops[kind]) {
      img.src = crops[kind];
    }
  };

  function renderQuizPanel() {
    const p = PROBLEMS[state.probId];
    const step = p.steps[state.stepIdx];
    if (!state.completedSteps[p.id]) state.completedSteps[p.id] = {};

    const pillsEl = document.getElementById("step-pills");
    if (pillsEl) {
      pillsEl.innerHTML = p.steps.map((s, idx) => {
        const done = state.completedSteps[p.id][idx];
        const active = idx === state.stepIdx;
        return `<button onclick="goToStep(${idx})" class="pill-btn ${active ? "active" : ""}">${done ? "✔ " : ""}Bước ${idx + 1}</button>`;
      }).join("");
    }

    document.getElementById("step-subtitle").textContent = step.title;
    document.getElementById("question-text").textContent = step.q;

    const hintBtn = document.getElementById("btn-hint");
    if (hintBtn) hintBtn.textContent = `💡 Gợi ý (${state.hintLevel}/3)`;
    const hintBox = document.getElementById("hint-box");
    if (hintBox) {
      if (state.hintLevel === 0) {
        hintBox.classList.add("hidden");
        hintBox.innerHTML = "";
      } else {
        hintBox.classList.remove("hidden");
        hintBox.innerHTML = step.hints.slice(0, state.hintLevel).map(h => `<div>• ${h}</div>`).join("");
      }
    }

    const optsGrid = document.getElementById("options-grid");
    const order = [
      (state.probId + state.stepIdx) % 4,
      (state.probId + state.stepIdx + 1) % 4,
      (state.probId + state.stepIdx + 2) % 4,
      (state.probId + state.stepIdx + 3) % 4
    ];
    const labels = ["A", "B", "C", "D"];

    optsGrid.innerHTML = order.map((origIdx, dispIdx) => {
      const opt = step.options[origIdx];
      return `
        <button onclick="checkAnswer(${origIdx}, this)" class="option-card">
          <span class="option-letter">${labels[dispIdx]}</span>
          <span>${opt.text}</span>
        </button>`;
    }).join("");

    const fb = document.getElementById("feedback-box");
    if (state.completedSteps[p.id][state.stepIdx]) {
      fb.className = "feedback-banner success";
      fb.innerHTML = `
        <div style="font-weight:700; margin-bottom:0.25rem;">✅ Bước này đã hoàn thành!</div>
        <div>${step.explain}</div>
        <div style="margin-top:0.65rem;">
          ${state.stepIdx < 4
            ? `<button onclick="goToStep(${state.stepIdx + 1})" class="btn btn-primary">Sang Bước ${state.stepIdx + 2}/5 →</button>`
            : `<button onclick="setMode('fill')" class="btn btn-primary">Chuyển sang Cấp 3: Điền khung giải →</button>`}
        </div>`;
    } else {
      fb.className = "feedback-banner hidden";
    }
  }

  window.checkAnswer = function (origIdx, btnEl) {
    const p = PROBLEMS[state.probId];
    const step = p.steps[state.stepIdx];
    const chosen = step.options[origIdx];
    const fb = document.getElementById("feedback-box");

    if (chosen.correct) {
      btnEl.classList.add("correct");
      const alreadyDone = state.completedSteps[p.id][state.stepIdx];
      state.completedSteps[p.id][state.stepIdx] = true;
      if (!alreadyDone) {
        state.combo += 1;
        const gained = 10 + (state.hintLevel === 0 ? 5 : 0) + (state.combo >= 3 ? 5 : 0);
        state.xp += Math.max(5, gained);
      }
      saveState();
      updateBadges();
      renderDiagramArea();

      fb.className = "feedback-banner success";
      fb.innerHTML = `
        <div style="font-weight:700; margin-bottom:0.25rem;">✅ Chính xác! (+${state.hintLevel === 0 ? 15 : 10} XP · 🔥 Combo ${state.combo})</div>
        <div><strong>Lời giải chuẩn vở mẫu:</strong> ${step.explain}</div>
        <div style="margin-top:0.65rem;">
          ${state.stepIdx < 4
            ? `<button onclick="goToStep(${state.stepIdx + 1})" class="btn btn-primary">Tiếp tục Bước ${state.stepIdx + 2}/5 →</button>`
            : `<button onclick="setMode('fill')" class="btn btn-primary">🏆 Hoàn thành 5/5 bước! Thử Cấp 3 (Điền số) →</button>`}
        </div>`;
    } else {
      btnEl.classList.add("wrong");
      state.combo = 0;
      const mItem = `[Câu ${p.id} - Bước ${state.stepIdx + 1}] ${chosen.why}`;
      if (!state.mistakes.includes(mItem)) {
        state.mistakes.push(mItem);
      }
      saveState();
      updateBadges();
      updateMistakeUI();

      fb.className = "feedback-banner danger";
      fb.innerHTML = `
        <div style="font-weight:700; margin-bottom:0.25rem;">❌ Chưa đúng — Phát hiện bẫy thường gặp!</div>
        <div><strong>Vì sao phương án này sai:</strong> ${chosen.why}</div>
        <div style="margin-top:0.35rem; color:var(--text-secondary);">Hãy chọn lại phương án khác hoặc bấm <strong>💡 Gợi ý</strong> ở góc trên.</div>`;
    }
  };

  window.showNextHint = function () {
    if (state.hintLevel < 3) {
      state.hintLevel += 1;
      state.xp = Math.max(0, state.xp - 3);
      saveState();
      updateBadges();
      renderQuizPanel();
    }
  };

  window.goToStep = function (idx) {
    state.stepIdx = idx;
    state.hintLevel = 0;
    const p = PROBLEMS[state.probId];
    state.diagTab = p.steps[idx].diagTab;
    renderDiagramArea();
    renderQuizPanel();
  };

  function getFillFields(p, ansObj) {
    const a = ansObj || p.ans;
    const fields = [];
    if (p.topology.startsWith("divider")) {
      fields.push({ key: "Rtd", label: "1a) Rtđ = R1 // R2 (kΩ)", val: a.Rtd });
      fields.push({ key: "Utd", label: "1b) Utđ = R2·Ucc/(R1+R2) (V)", val: a.Utd });
    }
    fields.push({ key: "IB", label: "1) Dòng tĩnh IB (µA)", val: a.IB });
    fields.push({ key: "IC", label: "1) Dòng tĩnh IC (mA)", val: a.IC });
    fields.push({ key: "IE", label: "1) Dòng tĩnh IE (mA)", val: a.IE });
    fields.push({ key: "UCE", label: "1) Điện áp tĩnh UCE (V)", val: a.UCE });
    fields.push({ key: "ICsat", label: "2) Đường tải: IC khi UCE=0 (mA)", val: a.ICsat });
    fields.push({ key: "re", label: "3) Điện trở vi phân re (Ω)", val: a.re });
    if (p.hasRE && !p.hasCE) {
      fields.push({ key: "Zb", label: "5a) Zb = β(re + RE) (kΩ)", val: a.Zb });
    }
    fields.push({ key: "Zv", label: `5) Tổng trở vào Zv (${a.ZvUnit})`, val: a.Zv });
    fields.push({ key: "Zr", label: `5) Tổng trở ra Zr (${a.ZrUnit})`, val: a.Zr });
    fields.push({ key: "Ku", label: "5) Hệ số KĐ áp Ku (có dấu −)", val: a.Ku });
    fields.push({ key: "Ki", label: "5) Hệ số KĐ dòng Ki (lần)", val: a.Ki });
    return fields;
  }

  function renderFillPanel() {
    const p = PROBLEMS[state.probId];
    const fields = getFillFields(p, p.ans);
    const formEl = document.getElementById("fill-form");
    formEl.innerHTML = fields.map(f => `
      <div class="field-row">
        <label for="fill-in-${f.key}">${f.label}:</label>
        <input type="text" id="fill-in-${f.key}" placeholder="Nhập số..." class="num-input"/>
      </div>
    `).join("");
    document.getElementById("fill-feedback").className = "feedback-banner hidden";
  }

  window.gradeFillMode = function () {
    const p = PROBLEMS[state.probId];
    const fields = getFillFields(p, p.ans);
    let correctCount = 0;
    const details = [];

    fields.forEach(f => {
      const el = document.getElementById("fill-in-" + f.key);
      const raw = (el.value || "").trim().replace(",", ".");
      const num = parseFloat(raw);
      const tol = Math.max(0.03, Math.abs(f.val) * 0.015);
      if (!isNaN(num) && Math.abs(num - f.val) <= tol) {
        correctCount++;
        el.className = "num-input ok";
      } else {
        el.className = "num-input err";
        details.push(`<strong>${f.label}</strong>: đáp án chuẩn = <code>${f.val}</code>`);
      }
    });

    const fb = document.getElementById("fill-feedback");
    if (correctCount === fields.length) {
      state.xp += 25;
      saveState();
      updateBadges();
      fb.className = "feedback-banner success";
      fb.innerHTML = `<strong>🏆 Tuyệt vời! Bạn điền đúng ${correctCount}/${fields.length} ô (+25 XP)!</strong><br/>Bạn đã thuộc lòng quy trình giải ${p.name}. Hãy thử chuyển sang <strong>🎲 Cấp 4: Bài sinh đôi</strong> nhé!`;
    } else {
      fb.className = "feedback-banner danger";
      fb.innerHTML = `<strong>Kết quả: Đúng ${correctCount}/${fields.length} ô</strong><br/>${details.join("<br/>")}`;
    }
  };

  window.fillShowSolution = function () {
    const p = PROBLEMS[state.probId];
    const fields = getFillFields(p, p.ans);
    fields.forEach(f => {
      const el = document.getElementById("fill-in-" + f.key);
      if (el) {
        el.value = f.val;
        el.className = "num-input ok";
      }
    });
  };

  window.generateTwinProblem = function () {
    const p = PROBLEMS[state.probId];
    const r2 = x => Math.round(x * 100) / 100;
    let prm = {};
    const ans = {};

    if (p.id === 1) {
      const choices = [
        { Ucc: 15, RB: 560, RC: 2.2, RE: 0, beta: 100 },
        { Ucc: 10, RB: 390, RC: 1.5, RE: 0, beta: 120 },
        { Ucc: 18, RB: 680, RC: 2.7, RE: 0, beta: 110 }
      ];
      prm = choices[Math.floor(Math.random() * choices.length)];
      ans.IB = r2((prm.Ucc - 0.7) / (prm.RB * 1000) * 1e6);
      ans.IC = r2(prm.beta * ans.IB * 1e-3);
      ans.IE = r2((prm.beta + 1) * ans.IB * 1e-3);
      ans.UCE = r2(prm.Ucc - ans.IC * prm.RC);
      ans.ICsat = r2(prm.Ucc / prm.RC);
      ans.UCEcut = prm.Ucc;
      ans.re = r2(26 / ans.IE);
      const bre = r2(prm.beta * ans.re);
      ans.Zv = r2((prm.RB * 1000 * bre) / (prm.RB * 1000 + bre));
      ans.ZvUnit = "Ω";
      ans.Zr = prm.RC;
      ans.ZrUnit = "kΩ";
      ans.Ku = r2(-prm.RC * 1000 / ans.re);
      ans.Ki = prm.beta;
    } else if (p.id === 2) {
      const choices = [
        { Ucc: 15, RB: 470, RC: 2.2, RE: 330, beta: 100 },
        { Ucc: 18, RB: 680, RC: 2.7, RE: 470, beta: 120 }
      ];
      prm = choices[Math.floor(Math.random() * choices.length)];
      ans.IB = r2((prm.Ucc - 0.7) / (prm.RB * 1000 + (prm.beta + 1) * prm.RE) * 1e6);
      ans.IC = r2(prm.beta * ans.IB * 1e-3);
      ans.IE = r2((prm.beta + 1) * ans.IB * 1e-3);
      ans.UCE = r2(prm.Ucc - ans.IC * 1e-3 * (prm.RC * 1000 + prm.RE));
      ans.ICsat = r2(prm.Ucc / (prm.RC + prm.RE / 1000));
      ans.UCEcut = prm.Ucc;
      ans.re = r2(26 / ans.IE);
      const bre = prm.beta * ans.re;
      ans.Zv = r2((prm.RB * 1000 * bre) / (prm.RB * 1000 + bre));
      ans.ZvUnit = "Ω";
      ans.Zr = prm.RC;
      ans.ZrUnit = "kΩ";
      ans.Ku = r2(-prm.RC * 1000 / ans.re);
      ans.Ki = prm.beta;
    } else if (p.id === 3) {
      const choices = [
        { Ucc: 18, RB: 390, RC: 2.0, RE: 1000, beta: 100 },
        { Ucc: 24, RB: 560, RC: 2.4, RE: 1200, beta: 99 }
      ];
      prm = choices[Math.floor(Math.random() * choices.length)];
      ans.IB = r2((prm.Ucc - 0.7) / (prm.RB * 1000 + (prm.beta + 1) * prm.RE) * 1e6);
      ans.IC = r2(prm.beta * ans.IB * 1e-3);
      ans.IE = r2((prm.beta + 1) * ans.IB * 1e-3);
      ans.UCE = r2(prm.Ucc - ans.IC * 1e-3 * (prm.RC * 1000 + prm.RE));
      ans.ICsat = r2(prm.Ucc / (prm.RC + prm.RE / 1000));
      ans.UCEcut = prm.Ucc;
      ans.re = r2(26 / ans.IE);
      ans.Zb = r2(prm.beta * (ans.re + prm.RE) / 1000);
      ans.Zv = r2((ans.Zb * prm.RB) / (ans.Zb + prm.RB));
      ans.ZvUnit = "kΩ";
      ans.Zr = prm.RC;
      ans.ZrUnit = "kΩ";
      ans.Ku = r2(-prm.RC * 1000 / (ans.re + prm.RE));
      ans.Ki = r2(prm.beta * prm.RB / (prm.RB + ans.Zb));
    } else if (p.id === 4) {
      prm = { Ucc: 15, R1: 180, R2: 47, RC: 2.0, RE: 470, beta: 100 };
      ans.Rtd = r2((prm.R1 * prm.R2) / (prm.R1 + prm.R2));
      ans.Utd = r2(prm.R2 * prm.Ucc / (prm.R1 + prm.R2));
      ans.IB = r2((ans.Utd - 0.7) / (ans.Rtd * 1000 + (prm.beta + 1) * prm.RE) * 1e6);
      ans.IC = r2(prm.beta * ans.IB * 1e-3);
      ans.IE = r2((prm.beta + 1) * ans.IB * 1e-3);
      ans.UCE = r2(prm.Ucc - ans.IC * 1e-3 * (prm.RC * 1000 + prm.RE));
      ans.ICsat = r2(prm.Ucc / (prm.RC + prm.RE / 1000));
      ans.UCEcut = prm.Ucc;
      ans.re = r2(26 / ans.IE);
      const bre_k = prm.beta * ans.re * 1e-3;
      ans.Zv = Math.round((ans.Rtd * bre_k) / (ans.Rtd + bre_k) * 1000) / 1000;
      ans.ZvUnit = "kΩ";
      ans.Zr = prm.RC;
      ans.ZrUnit = "kΩ";
      ans.Ku = r2(-prm.RC * 1000 / ans.re);
      ans.Ki = r2(prm.beta * ans.Rtd / (ans.Rtd + bre_k));
    } else if (p.id === 5) {
      prm = { Ucc: 12, R1: 680, R2: 220, RC: 3.0, RE: 220, beta: 150 };
      ans.Rtd = r2((prm.R1 * prm.R2) / (prm.R1 + prm.R2));
      ans.Utd = r2(prm.R2 * prm.Ucc / (prm.R1 + prm.R2));
      ans.IB = r2((ans.Utd - 0.7) / (ans.Rtd * 1000 + (prm.beta + 1) * prm.RE) * 1e6);
      ans.IC = r2(prm.beta * ans.IB * 1e-3);
      ans.IE = r2((prm.beta + 1) * ans.IB * 1e-3);
      ans.UCE = r2(prm.Ucc - ans.IC * 1e-3 * (prm.RC * 1000 + prm.RE));
      ans.ICsat = r2(prm.Ucc / (prm.RC + prm.RE / 1000));
      ans.UCEcut = prm.Ucc;
      ans.re = r2(26 / ans.IE);
      ans.Zb = r2(prm.beta * (ans.re + prm.RE) / 1000);
      ans.Zv = r2((ans.Rtd * ans.Zb) / (ans.Rtd + ans.Zb));
      ans.ZvUnit = "kΩ";
      ans.Zr = prm.RC;
      ans.ZrUnit = "kΩ";
      ans.Ku = r2(-prm.RC * 1000 / (ans.re + prm.RE));
      ans.Ki = r2(ans.Zv * 1000 / (ans.re + prm.RE));
    } else {
      prm = { Ucc: 18, RB: 560, RC: 2.4, RE: 470, beta: 120 };
      ans.IB = r2((prm.Ucc - 0.7) / (prm.RB * 1000 + prm.beta * (prm.RC * 1000 + prm.RE)) * 1e6);
      ans.IC = r2(prm.beta * ans.IB * 1e-3);
      ans.IE = r2((prm.beta + 1) * ans.IB * 1e-3);
      ans.UCE = r2(prm.Ucc - ans.IC * 1e-3 * (prm.RC * 1000 + prm.RE));
      ans.ICsat = r2(prm.Ucc / (prm.RC + prm.RE / 1000));
      ans.UCEcut = prm.Ucc;
      ans.re = r2(26 / ans.IE);
      ans.Zv = r2(ans.re / (1 / prm.beta + prm.RC / prm.RB));
      ans.ZvUnit = "Ω";
      ans.Zr = r2((prm.RC * prm.RB) / (prm.RC + prm.RB));
      ans.ZrUnit = "kΩ";
      ans.Ku = r2(-prm.RC * 1000 / ans.re);
      ans.Ki = r2(prm.RB / prm.RC);
    }

    const specsText = `+Ucc = ${prm.Ucc} V; ${
      prm.R1 ? `R1 = ${prm.R1} kΩ; R2 = ${prm.R2} kΩ` : `RB = ${prm.RB} kΩ`
    }; RC = ${prm.RC} kΩ${prm.RE ? `; RE = ${prm.RE} Ω` : ""}; β = ${prm.beta}; UBE = 0,7 V; UT = 26 mV`;

    state.twinData = { params: prm, ans: ans, specsText: specsText };
    document.getElementById("twin-specs").textContent = "Đề bài sinh đôi: " + specsText;

    const fields = getFillFields(p, ans);
    document.getElementById("twin-form").innerHTML = fields.map(f => `
      <div class="field-row">
        <label for="twin-in-${f.key}">${f.label}:</label>
        <input type="text" id="twin-in-${f.key}" placeholder="Nhập kết quả..." class="num-input"/>
      </div>
    `).join("");
    document.getElementById("twin-feedback").className = "feedback-banner hidden";
    renderDiagramArea();
  };

  window.gradeTwinMode = function () {
    const p = PROBLEMS[state.probId];
    if (!state.twinData) return;
    const fields = getFillFields(p, state.twinData.ans);
    let correctCount = 0;
    const details = [];

    fields.forEach(f => {
      const el = document.getElementById("twin-in-" + f.key);
      const raw = (el.value || "").trim().replace(",", ".");
      const num = parseFloat(raw);
      const tol = Math.max(0.05, Math.abs(f.val) * 0.02);
      if (!isNaN(num) && Math.abs(num - f.val) <= tol) {
        correctCount++;
        el.className = "num-input ok";
      } else {
        el.className = "num-input err";
        details.push(`<strong>${f.label}</strong>: đáp án chuẩn = <code>${f.val}</code>`);
      }
    });

    const score10 = Math.round((correctCount / fields.length) * 100) / 10;
    const fb = document.getElementById("twin-feedback");
    if (score10 >= 8) {
      state.xp += 40;
      saveState();
      updateBadges();
      fb.className = "feedback-banner success";
    } else {
      fb.className = "feedback-banner danger";
    }
    fb.innerHTML = `
      <strong>${score10 >= 8 ? "⭐ Đạt chuẩn Cấp 4!" : "📝 Kết quả chấm bài sinh đôi:"} Điểm: ${score10}/10 (${correctCount}/${fields.length} ý đúng)</strong><br/>
      ${details.length ? details.join("<br/>") : "Xuất sắc! Bạn đã tự giải đúng toàn bộ bài sinh đôi mà không cần nhìn lời giải mẫu!"}
    `;
  };

  window.selectProblem = function (id) {
    state.probId = id;
    state.stepIdx = 0;
    state.hintLevel = 0;
    state.revealDiag = false;
    state.diagTab = "dc";
    saveState();

    const titleEl = document.getElementById("problem-title");
    if (titleEl) titleEl.textContent = PROBLEMS[id].name;

    for (let i = 1; i <= 6; i++) {
      const btn = document.getElementById("ptab-" + i);
      if (btn) btn.className = i === id ? "pill-btn active" : "pill-btn";
    }

    if (state.mode === "quiz") renderQuizPanel();
    if (state.mode === "fill") renderFillPanel();
    if (state.mode === "twin") generateTwinProblem();
    renderDiagramArea();
  };

  window.setMode = function (m) {
    state.mode = m;
    ["quiz", "fill", "twin"].forEach(k => {
      const btn = document.getElementById("mode-" + k);
      const panel = document.getElementById("panel-" + k);
      if (btn) btn.className = k === m ? "mode-btn active" : "mode-btn";
      if (panel) {
        if (k === m) panel.classList.remove("hidden");
        else panel.classList.add("hidden");
      }
    });

    if (m === "quiz") renderQuizPanel();
    if (m === "fill") renderFillPanel();
    if (m === "twin") generateTwinProblem();
    renderDiagramArea();
  };

  window.setDiagramTab = function (tab) {
    state.diagTab = tab;
    renderDiagramArea();
  };

  window.toggleRevealDiagram = function () {
    state.revealDiag = !state.revealDiag;
    const btn = document.getElementById("btn-reveal-diag");
    if (btn) btn.textContent = state.revealDiag ? "Ẩn đáp án hình" : "Hiện đáp án hình";
    renderDiagramArea();
  };

  window.toggleMistakeModal = function () {
    const m = document.getElementById("mistake-modal");
    if (m) m.classList.toggle("hidden");
  };

  window.toggleTheme = function () {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("ktdt_theme", next);
  };

  function updateBadges() {
    const xpEl = document.getElementById("xp-badge");
    const cbEl = document.getElementById("combo-badge");
    if (xpEl) xpEl.textContent = `⭐ ${state.xp} XP`;
    if (cbEl) cbEl.textContent = `🔥 Combo ${state.combo}`;
  }

  function updateMistakeUI() {
    const cntEl = document.getElementById("mistake-count");
    const listEl = document.getElementById("mistake-list");
    if (cntEl) cntEl.textContent = state.mistakes.length;
    if (listEl) {
      listEl.innerHTML = state.mistakes.length
        ? state.mistakes.map((m, i) => `<div>${i + 1}. ${m}</div>`).join("")
        : "Chưa có lỗi sai nào! Hãy bắt đầu trả lời các bước để kiểm tra.";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("ktdt_theme");
    if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

    // Check URL hash or ?cau= query param
    const params = new URLSearchParams(window.location.search);
    const cau = parseInt(params.get("cau"), 10);
    if (cau >= 1 && cau <= 6) state.probId = cau;

    updateBadges();
    updateMistakeUI();
    if (document.getElementById("diagram-container")) {
      selectProblem(state.probId);
      setMode("quiz");
    }
  });
})();
