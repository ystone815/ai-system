// data.js - Knowledge Base Content Database (Expanded with Recent Trends)
window.aiSystemData = [
  {
    id: "application",
    title: "Application & Workloads",
    icon: "layout",
    subcategories: [
      {
        id: "llm_generative",
        title: "LLM & Generative AI",
        items: [
          {
            id: "pretraining",
            title: "Pre-training (사전 학습)",
            summary: "초대규모 언어 모델의 대규모 말뭉치 학습 기법 및 아키텍처 특성",
            content: `
              <h3>대규모 언어 모델(LLM) 사전 학습 개요</h3>
              <p>LLM의 사전 학습(Pre-training)은 수십억 내지 수조 개의 토큰으로 구성된 데이터셋을 사용하여 모델의 파라미터를 업데이트하는 거대한 스케일의 계산 과정입니다. 주로 트랜스포머(Transformer) 디코더-전용(Decoder-only) 아키텍처가 사용되며, 다음 토큰을 예측하는 Causal Language Modeling(CLM) 목적 함수를 학습합니다.</p>
              
              <div class="info-box">
                <h4>핵심 병목 요인 (Key Bottlenecks)</h4>
                <ul>
                  <li><strong>Compute-Bound vs Memory-Bound:</strong> 어텐션(Attention) 연산과 선형 투영(Linear Projections) 연산은 대규모 연산 처리가 필요해 GPU Tensor Core 성능을 최대한 쥐어짜야 합니다.</li>
                  <li><strong>통신 병목 (Communication overhead):</strong> 수천 대의 GPU 환경에서는 가중치 동기화 및 텐서 병렬 처리를 위한 올리듀스(All-Reduce) 등의 통신 부하가 전체 학습 효율의 치명적인 저하를 초래합니다.</li>
                  <li><strong>장애 복구 (Fault Tolerance):</strong> 거대한 클러스터 환경에서는 하드웨어 불량(GPU 고장, 네트워크 패킷 드롭)이 빈번하므로 체크포인팅(Checkpointing) 최적화가 필수적입니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "Attention Is All You Need",
                authors: "Vaswani et al.",
                venue: "NeurIPS 2017",
                link: "https://arxiv.org/abs/1706.03762",
                note: "트랜스포머 아키텍처를 최초 제안하여 현대 LLM의 근간을 이룬 논문"
              },
              {
                title: "Llama 3 Technical Report",
                authors: "Meta AI",
                venue: "ArXiv 2024",
                link: "https://arxiv.org/abs/2407.21783",
                note: "16K GPU 클러스터 설계 및 사전 학습 데이터 파이프라인의 실무적 디테일 제공"
              }
            ],
            resources: [
              {
                title: "Megatron-LM GitHub Repository",
                link: "https://github.com/NVIDIA/Megatron-LM"
              }
            ]
          },
          {
            id: "finetuning",
            title: "Fine-tuning & Alignment",
            summary: "지시어 학습(Instruction Tuning) 및 인간 피드백 기반 정렬(RLHF/DPO) 기법",
            content: `
              <h3>미세 조정 및 인간 가치 정렬 (Alignment)</h3>
              <p>사전 학습된 베이스 모델을 특정 작업이나 대화형 에이전트로 동작하게 만들기 위한 과정입니다. 전체 가중치를 업데이트하는 Full Fine-tuning 외에, 자원의 한계를 극복하기 위해 파라미터 효율적 미세조정(PEFT) 기법이 많이 활용됩니다.</p>
              
              <div class="info-box">
                <h4>주요 미세조정 및 정렬 기법</h4>
                <ul>
                  <li><strong>LoRA (Low-Rank Adaptation):</strong> 기존 가중치를 고정하고 가중치 행렬의 변화량(\\( \\Delta W \\))을 두 개의 저차원 행렬로 분해하여 파라미터 수와 메모리 사용량을 대폭 절감합니다.</li>
                  <li><strong>QLoRA (Quantized LoRA):</strong> 사전 학습 가중치를 4비트 NormalFloat(NF4) 형식으로 양자화하여 미세 조정에 필요한 메모리를 수 분의 일로 줄이면서도 성능을 유지합니다.</li>
                  <li><strong>RLHF (Reinforcement Learning from Human Feedback):</strong> 보상 모델을 구축하고 PPO 알고리즘을 사용해 인간 선호도에 맞춰 모델을 조율합니다.</li>
                  <li><strong>DPO (Direct Preference Optimization):</strong> 복잡한 강화 학습 과정 없이 선호 데이터셋에 직접 크로스 엔트로피 유사 손실 함수를 적용하여 빠르고 안정적인 정렬을 달성합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "LoRA: Low-Rank Adaptation of Large Language Models",
                authors: "Hu et al.",
                venue: "ICLR 2022",
                link: "https://arxiv.org/abs/2106.09685",
                note: "저차원 행렬 분해를 통한 효율적 가중치 업데이트 기법 표준 정립"
              },
              {
                title: "Direct Preference Optimization",
                authors: "Rafailov et al.",
                venue: "NeurIPS 2023",
                link: "https://arxiv.org/abs/2305.18290",
                note: "RLHF의 복잡성을 제거하고 모델의 답변 선호도를 직접 학습시키는 DPO 제안"
              }
            ],
            resources: [
              {
                title: "Hugging Face PEFT Library",
                link: "https://github.com/huggingface/peft"
              }
            ]
          },
          {
            id: "inference_serving",
            title: "Inference & Serving",
            summary: "대형 모델의 실시간 서빙 및 높은 처리량을 위한 아키텍처 최적화",
            content: `
              <h3>대규모 언어 모델 서빙 시스템과 vLLM 핵심 아키텍처</h3>
              <p>LLM 추론은 자동회귀적(Autoregressive) 생성 모델 특성상 입력 토큰 크기에 비례하는 <strong>KV Cache(Key-Value Cache)</strong>의 저장이 필수적입니다. 이는 엄청난 양의 GPU 메모리를 차지하며, 유휴 메모리 단편화로 인해 실제 처리량을 제한하는 가장 큰 요인입니다. 본 문서에서는 vLLM의 핵심 메커니즘과 현대적인 서빙 최적화 기법을 10개 섹션에 걸쳐 심층 분석합니다.</p>

              <!-- Web Image Integration Showcase -->
              <div class="info-box" style="border-left: 4px solid #8b5cf6;">
                <h4>💡 인터넷 이미지 동적 로딩 데모</h4>
                <p>로컬 개발 환경의 보안 설정(Access Denied)으로 인해 CLI 환경에서 직접 다운로드가 가로막힐 수 있으나, 본 웹 애플리케이션은 브라우저를 통해 <strong>인터넷상의 이미지 CDN 주소를 직접 참조하여 실시간으로 이미지를 로딩</strong>하도록 구현되었습니다. 아래 로고는 공식 GitHub Repository의 미디킷에서 직접 로드한 실시간 이미지입니다.</p>
                <img src="https://raw.githubusercontent.com/vllm-project/media-kit/main/vLLM-logo-horizontal.png" alt="vLLM Official Logo from GitHub" style="max-width: 250px; display: block; margin: 15px auto; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;" />
              </div>

              <h3>1. LLM 추론의 독특한 병목 특성 (Prefill vs Decode)</h3>
              <p>LLM 추론 과정은 크게 입력 프롬프트를 한 번에 연산하여 최초 토큰을 만들어내는 <strong>Prefill(프리필) 단계</strong>와, 이후 자동회귀적으로 다음 토큰을 하나씩 생성하는 <strong>Decode(디코드) 단계</strong>로 구분됩니다.</p>
              <ul>
                <li><strong>Prefill 단계 (Compute-Bound):</strong> 다수의 입력 토큰을 동시에 병렬 처리하므로 연산 밀도가 매우 높습니다. GPU Tensor Core 성능을 최대로 가동하며, 연산 장치의 TFLOPs 성능이 속도를 결정합니다.</li>
                <li><strong>Decode 단계 (Memory-Bound):</strong> 매 토큰을 생성할 때마다 이미 로드되었던 가중치 행렬과 이전 단계들의 KV 캐시를 GPU 전역 메모리(HBM)에서 고속 SRAM 캐시로 로딩해야 합니다. 이 단계에서는 연산 밀도(Arithmetic Intensity)가 극단적으로 저하되며, HBM의 메모리 대역폭(Bandwidth)이 병목 요인이 됩니다.</li>
              </ul>
              <p>추론 단계의 산술적 연산 밀도 식은 다음과 같습니다:</p>
              <p style="text-align: center; margin: 12px 0;">
                \\( \\text{Arithmetic Intensity} = \\frac{\\text{Total FLOPs}}{\\text{Total Memory Access (Bytes)}} \\approx \\frac{2 \\cdot P \\cdot 1}{\\text{Bytes Transfer (Weights + KV Cache)}} \\)
              </p>
              <p>여기서 \\( P \\)는 모델의 총 파라미터 수입니다. 파라미터 수에 비해 매 반복마다 발생하는 메모리 접근량이 매우 커서 메모리 대역폭 한계에 부딪히게 됩니다.</p>

              <h4>LLM 추론 단계별 병목 특성 (Prefill vs Decode)</h4>
              <svg viewBox="0 0 500 200" width="100%" class="svg-diagram">
                <style>
                  .svg-bg { fill: #11131e; rx: 12px; }
                  .highlight-blue { fill: #1e1b4b; stroke: #4f46e5; stroke-width: 2; rx: 8px; }
                  .highlight-green { fill: #022c22; stroke: #10b981; stroke-width: 2; rx: 8px; }
                  .label-title { font-family: 'Inter', sans-serif; font-size: 12px; fill: #f3f4f6; text-anchor: middle; font-weight: bold; }
                  .label-body { font-family: 'Inter', sans-serif; font-size: 10px; fill: #cbd5e1; }
                  .metric-label { font-family: 'Inter', sans-serif; font-size: 10px; fill: #94a3b8; font-weight: bold; }
                  .metric-value-blue { font-family: 'Inter', sans-serif; font-size: 11px; fill: #818cf8; font-weight: bold; }
                  .metric-value-green { font-family: 'Inter', sans-serif; font-size: 11px; fill: #34d399; font-weight: bold; }
                  .arrow { stroke: #64748b; stroke-width: 2; fill: none; }
                </style>
                <rect width="500" height="200" class="svg-bg" />
                
                <!-- Prefill Phase Box -->
                <rect x="30" y="30" width="200" height="140" class="highlight-blue" />
                <text x="130" y="52" class="label-title" fill="#a5b4fc">1. Prefill Phase (프리필)</text>
                <text x="45" y="80" class="label-body">• 입력 프롬프트 전체 일괄 연산</text>
                <text x="45" y="98" class="label-body">• 대규모 행렬 곱 병렬 수행</text>
                <text x="45" y="116" class="label-body">• Tensor Core 최대 활용</text>
                <line x1="45" y1="126" x2="215" y2="126" stroke="#312e81" stroke-width="1" />
                <text x="45" y="148" class="metric-label">병목 요인:</text>
                <text x="100" y="148" class="metric-value-blue">Compute-Bound</text>
                
                <!-- Decode Phase Box -->
                <rect x="270" y="30" width="200" height="140" class="highlight-green" />
                <text x="370" y="52" class="label-title" fill="#a7f3d0">2. Decode Phase (디코드)</text>
                <text x="285" y="80" class="label-body">• 토큰 순차적 1개씩 생성</text>
                <text x="285" y="98" class="label-body">• 매 스텝 가중치&KV캐시 로딩</text>
                <text x="285" y="116" class="label-body">• HBM 대역폭 고갈 유발</text>
                <line x1="285" y1="126" x2="455" y2="126" stroke="#064e3b" stroke-width="1" />
                <text x="285" y="148" class="metric-label">병목 요인:</text>
                <text x="340" y="148" class="metric-value-green">Memory-Bound</text>

                <!-- Connection Arrow -->
                <path d="M 238 100 L 262 100" class="arrow" stroke-linecap="round" />
                <polygon points="262,97 268,100 262,103" fill="#64748b" />
              </svg>

              <h3>2. KV Cache와 메모리 단편화 문제</h3>
              <p>Autoregressive 디코딩에서는 이전 단계에서 연산했던 Key와 Value 벡터들을 메모리에 캐싱(KV Cache)해두고 재사용함으로써 연산 낭비를 막습니다. KV 캐시 크기는 다음과 같이 누적 계산됩니다:</p>
              <p style="text-align: center; margin: 12px 0;">
                \\\\( \\\\text{Size}_{\\\\text{KVCache}} = 2 \\\\times n_{\\\\text{layers}} \\\\times n_{\\\\text{heads}} \\\\times d_{\\\\text{head}} \\\\times s \\\\times b_{\\\\text{bytes}} \\\\)
              </p>
              <p>여기서 \\\\( s \\\\)는 누적 시퀀스 길이, \\\\( b_{\\\\text{bytes}} \\\\)는 부동소수점 바이트 수(예: FP16은 2)입니다. 기존 서빙 시스템(예: HuggingFace Transformers)은 요청이 들어오면 해당 요청의 최대 생성 가능 길이(Max Sequence Length)에 맞추어 메모리를 미리 <strong>정적으로 할당</strong>합니다. 이로 인해 세 가지 메모리 낭비가 발생합니다:</p>
              <ul>
                <li><strong>내부 단편화 (Internal Fragmentation):</strong> 실제 출력 결과가 최대 시퀀스 길이보다 훨씬 짧게 종료될 때 남겨진 낭비 공간입니다.</li>
                <li><strong>외부 단편화 (External Fragmentation):</strong> 다양한 길이의 요청이 서로 다른 타이밍에 생성 및 해제되면서 HBM 메모리 공간이 조각나 큰 덩어리의 새 할당을 방해하는 문제입니다.</li>
                <li><strong>예약 낭비 (Reservation Waste):</strong> 앞으로 점진적으로 채워질 공간을 초기에 통째로 선점하여 생기는 유휴 자원 낭비입니다.</li>
              </ul>

              <h3>3. PagedAttention 핵심 메커니즘</h3>
              <p>vLLM의 핵심 기술인 <strong>PagedAttention</strong>은 운영체제의 가상 메모리 페이징(Paging) 기법을 메모리 관리에 도용했습니다. KV 캐시를 연속된 실제 메모리 공간이 아닌, 고정된 크기(예: 16개 토큰)의 물리적 <strong>블록(Physical Block)</strong>으로 분할하여 HBM 내부의 불연속적인 영역에 분산 저장합니다.</p>
              <p>가상의 페이지 테이블(Block Table)을 통해 논리적 토큰 주소를 물리적 메모리 블록 주소로 유연하게 매핑하므로 메모리 단편화를 거의 0%로 줄이고, 사용 가능한 배치 크기를 대폭 확대합니다.</p>
              
              <img src="images/vllm_paged_attention.png" alt="vLLM PagedAttention Memory Architecture" />
              <div class="image-caption">그림 1: Logical KV Cache 페이지와 Physical HBM 블록의 가상 매핑 아키텍처</div>

              <h4>PagedAttention 논리-물리 주소 매핑 구조</h4>
              <svg viewBox="0 0 500 240" width="100%" class="svg-diagram">
                <style>
                  .svg-bg { fill: #11131e; rx: 12px; }
                  .block-logical { fill: #1e1b4b; stroke: #4f46e5; stroke-width: 1.5; rx: 4px; }
                  .block-physical { fill: #064e3b; stroke: #10b981; stroke-width: 1.5; rx: 4px; }
                  .block-table { fill: #1f2937; stroke: #4b5563; stroke-width: 1.5; rx: 6px; }
                  .text-main { font-family: 'Inter', sans-serif; font-size: 11px; fill: #f3f4f6; }
                  .text-bold { font-family: 'Inter', sans-serif; font-size: 11px; fill: #f3f4f6; font-weight: bold; }
                  .text-muted { font-family: 'Inter', sans-serif; font-size: 9px; fill: #9ca3af; text-anchor: middle; }
                  .link-line { stroke: #f43f5e; stroke-width: 1.5; fill: none; stroke-dasharray: 2; }
                  .map-arrow { stroke: #818cf8; stroke-width: 1.5; fill: none; }
                </style>
                <rect width="500" height="240" class="svg-bg" />
                
                <!-- Logical Blocks -->
                <text x="80" y="30" class="text-bold" fill="#a5b4fc" text-anchor="middle">Logical KV Cache (논리 시퀀스)</text>
                <rect x="30" y="50" width="100" height="40" class="block-logical" />
                <text x="80" y="74" class="text-main" text-anchor: middle>Logical Block 0</text>
                <text x="80" y="105" class="text-muted">Tokens 0~15</text>
                
                <rect x="30" y="130" width="100" height="40" class="block-logical" />
                <text x="80" y="154" class="text-main" text-anchor: middle>Logical Block 1</text>
                <text x="80" y="185" class="text-muted">Tokens 16~31</text>
                
                <!-- Block Table -->
                <text x="250" y="30" class="text-bold" fill="#cbd5e1" text-anchor: middle>Block Table (페이지 테이블)</text>
                <rect x="180" y="50" width="140" height="120" class="block-table" />
                <text x="250" y="75" class="text-main" text-anchor: middle>L-Block 0 → P-Block 7</text>
                <line x1="190" y1="90" x2="310" y2="90" stroke="#374151" stroke-width="1" />
                <text x="250" y="115" class="text-main" text-anchor: middle>L-Block 1 → P-Block 3</text>
                <line x1="190" y1="130" x2="310" y2="130" stroke="#374151" stroke-width="1" />
                <text x="250" y="150" class="text-muted">Free blocks remaining: 98</text>

                <!-- Physical GPU Memory (HBM) -->
                <text x="420" y="30" class="text-bold" fill="#a7f3d0" text-anchor: middle>Physical HBM (비연속 메모리)</text>
                
                <!-- Physical Block 3 -->
                <rect x="370" y="50" width="100" height="30" class="block-physical" />
                <text x="420" y="68" class="text-main" text-anchor: middle>Physical Block 3</text>
                
                <!-- Empty Space -->
                <rect x="370" y="90" width="100" height="25" fill="#1e293b" stroke="#334155" stroke-dasharray="3" rx="4" />
                <text x="420" y="106" class="text-muted">Unallocated Block 4</text>
                
                <!-- Physical Block 7 -->
                <rect x="370" y="125" width="100" height="30" class="block-physical" />
                <text x="420" y="143" class="text-main" text-anchor: middle>Physical Block 7</text>
                
                <!-- Mapping Connectors -->
                <path d="M 130 70 L 175 70" class="map-arrow" />
                <path d="M 130 150 L 175 110" class="map-arrow" />
                
                <path d="M 320 75 C 345 75, 345 140, 365 140" class="link-line" />
                <path d="M 320 115 C 345 115, 345 65, 365 65" class="link-line" />
              </svg>

              <h3>4. Continuous Batching (Iteration-level Scheduling)</h3>
              <p>전통적인 정적 배칭(Static Batching) 방식은 배치 내부의 여러 요청 중 가장 긴 텍스트 생성이 끝날 때까지 다른 완료된 요청들도 GPU를 점유한 채 대기해야만 했습니다. 반면, <strong>Continuous Batching(또는 Iteration-level Batching)</strong> 기법은 한 토큰 생성 주기(Iteration)가 끝날 때마다 끝난 요청을 즉시 내보내고(Evict), 대기 중인 새 요청을 즉각 투입하여 연산 유휴(Idle) 시간과 레이턴시를 획기적으로 개선합니다.</p>
              
              <img src="images/continuous_batching.png" alt="Static vs Continuous Batching Timeline" />
              <div class="image-caption">그림 2: Static Batching과 Continuous Batching의 요청 스케줄링 타임라인 비교</div>

              <h3>5. vLLM의 메모리 공유 및 Copy-on-Write (COW)</h3>
              <p>vLLM은 다중 출력 샘플링(Temperature Sampling 에서 n > 1)이나 빔 서치(Beam Search)와 같이 동일한 프롬프트로부터 파생된 여러 생성 시퀀스를 처리할 때 압도적인 메모리 효율성을 자랑합니다. 여러 시퀀스가 프롬프트 영역의 물리적 KV 캐시 블록을 <strong>참조 카운트(Reference Count)</strong>를 늘려 직접 공유하기 때문입니다.</p>
              <p>이후 개별 시퀀스가 독자적인 새로운 토큰을 생성하여 쓰기(Write) 작업을 수행할 때만, 해당 블록의 사본을 새 물리 메모리에 복제한 뒤 포인터를 변경하는 <strong>Copy-on-Write (COW)</strong> 프로토콜이 작동합니다. 이를 통해 공통 영역의 중복 할당이 원천 차단됩니다.</p>

              <h4>Copy-on-Write (COW) 물리 블록 분기 메커니즘</h4>
              <svg viewBox="0 0 500 220" width="100%" class="svg-diagram">
                <style>
                  .svg-bg { fill: #11131e; rx: 12px; }
                  .block-shared { fill: #1e1b4b; stroke: #8b5cf6; stroke-width: 2; rx: 4px; }
                  .block-seqA { fill: #0f172a; stroke: #3b82f6; stroke-width: 1.5; rx: 4px; }
                  .block-seqB { fill: #0f172a; stroke: #ec4899; stroke-width: 1.5; rx: 4px; }
                  .text-main { font-family: 'Inter', sans-serif; font-size: 11px; fill: #f3f4f6; }
                  .text-bold { font-family: 'Inter', sans-serif; font-size: 11px; fill: #f3f4f6; font-weight: bold; }
                  .text-muted { font-family: 'Inter', sans-serif; font-size: 9px; fill: #9ca3af; text-anchor: middle; }
                  .arrow-seqA { stroke: #3b82f6; stroke-width: 1.5; fill: none; }
                  .arrow-seqB { stroke: #ec4899; stroke-width: 1.5; fill: none; }
                </style>
                <rect width="500" height="220" class="svg-bg" />
                
                <!-- Shared Prefix Blocks -->
                <text x="110" y="30" class="text-bold" fill="#c084fc">Shared Prefix Blocks (공통 프롬프트)</text>
                <rect x="30" y="50" width="160" height="40" class="block-shared" />
                <text x="110" y="74" class="text-main" text-anchor: middle>Physical Block 10 (Ref: 2)</text>
                <text x="110" y="105" class="text-muted">A와 B 시퀀스가 동일 프롬프트 공유</text>

                <!-- Separator Line -->
                <line x1="210" y1="20" x2="210" y2="200" stroke="#334155" stroke-dasharray="4" />

                <!-- Branched Sequence A -->
                <text x="340" y="30" class="text-bold" fill="#60a5fa">Sequence A (출력 A)</text>
                <rect x="240" y="50" width="230" height="40" class="block-seqA" />
                <text x="355" y="74" class="text-main" text-anchor: middle>Physical Block 11 (Ref: 1)</text>
                <text x="355" y="105" class="text-muted" fill="#60a5fa">A의 고유 토큰 저장 블록</text>

                <!-- Branched Sequence B (Copy-on-Write Triggered) -->
                <text x="340" y="140" class="text-bold" fill="#f472b6">Sequence B (출력 B - COW 발생)</text>
                <rect x="240" y="160" width="230" height="40" class="block-seqB" />
                <text x="355" y="184" class="text-main" text-anchor: middle>Physical Block 12 (Ref: 1) [COW 복제]</text>
                
                <!-- Connector Arrows -->
                <path d="M 190 70 C 215 70, 215 70, 235 70" class="arrow-seqA" />
                <path d="M 190 70 C 215 70, 215 180, 235 180" class="arrow-seqB" />
              </svg>

              <h3>6. Automatic Prefix Caching (APC) 최적화</h3>
              <p>vLLM의 <strong>Automatic Prefix Caching (APC)</strong> 기법은 시스템 프롬프트(System Prompt), 대화 포맷 템플릿, 그리고 RAG(Retrieval-Augmented Generation) 시스템의 컨텍스트 문서와 같이 요청 간에 빈번하게 중복되는 접두사(Prefix) 데이터의 연산 비용을 획기적으로 낮춥니다.</p>
              <ul>
                <li><strong>Prefix Hash Map 관리:</strong> 토큰 시퀀스의 특정 블록 경계를 기준으로 해시값(\\( \\text{Hash}(\\text{Tokens}) \\))을 연산하여 HBM 상의 물리 블록 주소와 매핑해 둡니다.</li>
                <li><strong>Prefill 스킵:</strong> 새로 진입한 요청의 앞단 토큰들이 기존 해시 테이블의 엔트리와 완벽히 일치할 경우, 프리필 단계를 실행하지 않고 기 구축된 물리 블록의 KV 캐시를 즉시 포인터 매핑으로 재활용합니다.</li>
              </ul>
              <p>이를 통해 다중 턴 에이전트 대화 및 대용량 문서 질의 수행 시 TTFT(첫 번째 토큰 생성 시간)를 거의 0으로 수렴시킵니다.</p>

              <h3>7. Chunked Prefill & Piggybacking</h3>
              <p>대규모 프롬프트 입력이 들어오면 Prefill 연산 시간이 매우 길어져 기존에 열심히 토큰을 디코딩하고 있던(Decode) 요청들이 연산 자원을 선점당해 응답 지연(TPOT 스파이크)을 겪게 됩니다. vLLM은 이를 해소하고자 <strong>Chunked Prefill</strong>을 지원합니다.</p>
              <p>길이가 긴 프롬프트 연산을 지정된 크기(예: 512 토큰 단위)의 청크로 쪼개어 여러 반복(Iteration) 주기에 걸쳐 분산 연산합니다. 이때 현재 진행 중인 디코드 요청들의 연산 단계 사이에 프리필 청크 연산을 슬쩍 얹어서 병행 처리(Piggybacking)함으로써, GPU의 하드웨어 컴퓨트 밀도를 고르게 채우고 디코드 지연 현상을 최소화합니다.</p>

              <h3>8. vLLM의 분산 추론 가속 (Tensor & Pipeline Parallelism)</h3>
              <p>단일 GPU HBM 용량을 아득히 초과하는 초대형 LLM(예: Llama 3 70B 이상)을 저지연으로 서빙하기 위해 vLLM은 고도화된 다중 GPU 분산 연산 기능을 지원합니다.</p>
              <ul>
                <li><strong>텐서 병렬화 (Tensor Parallelism - TP):</strong> Megatron-LM 방식으로 어텐션 투영(QKV Projection) 연산 행렬과 MLP 레이어의 연산 블록을 동일 노드 내 여러 GPU에 균등하게 슬라이싱하여 분산 처리합니다.</li>
                <li><strong>파이프라인 병렬화 (Pipeline Parallelism - PP):</strong> 신경망 레이어 스택을 노드 단위로 그룹 지어 분산시키고 마이크로배치 스케줄링을 통해 레이어 간 활성화 값을 전달합니다.</li>
                <li><strong>통신 최적화 커널:</strong> GPU 간의 고속 인터커넥트(NVLink)를 극대화하는 커스텀 비동기 올리듀스(All-Reduce) CUDA 커널을 직접 개발 및 적재하여 통신 레이턴시 병목을 극소화합니다.</li>
              </ul>

              <h3>9. vLLM 엔진 아키텍처 및 내부 컴포넌트</h3>
              <p>vLLM의 핵심 연산 엔진 구조는 다음과 같은 핵심 컴포넌트들의 유기적 순환 호출로 구성됩니다:</p>
              <ul>
                <li><strong>LLMEngine / AsyncLLMEngine:</strong> 엔진의 진입점으로 요청을 수집하고 전체적인 조율을 관장합니다. Async Engine은 파이썬 비동기(asyncio) 태스크 큐를 기반으로 동시 다발적인 웹 API 요청을 효율적으로 정렬해 줍니다.</li>
                <li><strong>Scheduler (스케줄러):</strong> 가용 GPU 물리 블록의 여유분을 끊임없이 모니터링하며 대기(Waiting), 실행(Running), 스왑(Swapped) 상태의 요청군을 반복 루프마다 최적으로 배치합니다.</li>
                <li><strong>BlockManager (블록 관리자):</strong> 물리 메모리의 할당 상태 및 가상 메모리 테이블(Block Table)을 설계하고, Copy-on-Write 동작에 필요한 참조 계수 관리를 전담하는 핵심 컨트롤러입니다.</li>
                <li><strong>CacheEngine (캐시 엔진):</strong> HBM의 물리 블록 관리 및 메모리 부족 시 데이터를 CPU의 시스템 메모리(DDR) 영역으로 임시 전송(Swap-out)하거나 다시 GPU로 복귀(Swap-in)시키는 CUDA DtoD 전송 동작을 실행합니다.</li>
              </ul>

              <h3>10. 추론 성능 지표 및 최적화 방법론 (Tuning)</h3>
              <p>vLLM 기반 서빙의 최적화 수준을 평가하는 핵심 3대 지표는 다음과 같습니다:</p>
              <ol>
                <li><strong>TTFT (Time to First Token):</strong> 사용자가 질문을 던지고 첫 번째 응답 글자가 브라우저에 찍힐 때까지의 지연 시간 (Prefill 속도가 핵심).</li>
                <li><strong>TPOT (Time Per Output Token):</strong> 첫 토큰 출력 이후 각 후속 글자들이 뱉어지는 평균 주기 (Decode 대역폭이 핵심).</li>
                <li><strong>System Throughput (Tokens/sec):</strong> 전체 시스템이 초당 처리 완료하여 출력해 낸 모든 활성 사용자의 토큰 수의 합산 값.</li>
              </ol>
              <div class="info-box">
                <h4>vLLM 튜닝 핵심 옵션 가이드</h4>
                <ul>
                  <li><code>--gpu-memory-utilization</code>: KV 캐시 할당용 GPU 가용 메모리 비중 (기본값 0.90, OOM 방지 및 성능 균형점 조율).</li>
                  <li><code>--block-size</code>: PagedAttention의 단일 블록 당 할당 토큰 크기 (8 또는 16 권장, 작을수록 단편화 감소하나 관리 부하 증가).</li>
                  <li><code>--enable-chunked-prefill</code>: 청크 프리필 활성화 여부 (실시간 멀티유저 서빙의 지연 시간 균일화에 필수적).</li>
                  <li><code>--swap-space</code>: GPU 메모리 포화 시 CPU 메모리로 밀어낼 스왑 캐시 용량 지정 (단위: GB).</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "Efficient Memory Management for LLM Serving with PagedAttention",
                authors: "Kwon et al.",
                venue: "SOSP 2023",
                link: "https://arxiv.org/abs/2309.06180",
                note: "vLLM 엔진의 핵심 기술로 가상 메모리 페이징 기법을 결합하여 동적 KV 캐시를 최적화"
              },
              {
                title: "Orca: A Distributed Serving System for Transformer-Based Generative Models",
                authors: "Yu et al.",
                venue: "SOSP 2022",
                link: "https://www.usenix.org/conference/osdi22/presentation/yu",
                note: "토큰 단위로 배치를 동적으로 재구성하는 Continuous Batching 개념을 최초 제시한 기념비적 연구"
              },
              {
                title: "Fast Inference from Transformers via Speculative Decoding",
                authors: "Leviathan et al.",
                venue: "ICML 2023",
                link: "https://arxiv.org/abs/2211.17192",
                note: "Draft 모델과 Target 모델의 결합을 통한 투기적 디코딩 확률 검증 이론 제안"
              }
            ],
            resources: [
              {
                title: "vLLM GitHub project",
                link: "https://github.com/vllm-project/vllm"
              },
              {
                title: "vLLM Official Documentation",
                link: "https://docs.vllm.ai/"
              }
            ]
          },
          {
            id: "moe",
            title: "Mixture of Experts (MoE)",
            summary: "스파스 게이팅(Sparse Gating) 기반 조건부 연산 및 전문가 병렬화(EP) 기법",
            content: `
              <h3>Mixture of Experts (MoE) 시스템 개요</h3>
              <p>모든 입력 토큰이 모델의 모든 파라미터를 통과하는 기존 Dense 모델과 달리, MoE(전문가 믹스) 아키텍처는 토큰마다 <strong>라우터(Router/Gating Network)</strong>가 가장 적합한 일부 <strong>전문가(Expert) 레이어</strong>만을 선택하여 연산을 실행합니다. 이를 통해 파라미터 수는 대폭 늘리면서 연산량(FLOPs)과 추론 비용을 획기적으로 낮춥니다.</p>

              <div class="info-box">
                <h4>MoE의 주요 하드웨어/소프트웨어 과제</h4>
                <ul>
                  <li><strong>전문가 병렬화 (Expert Parallelism - EP):</strong> 전문가 가중치가 여러 GPU에 분산되어 상주합니다. 따라서 토큰이 해당하는 전문가 GPU를 찾아가기 위해 대규모 <strong>All-to-All 통신</strong>이 빈번하게 발생하여 네트워크 병목을 야기합니다.</li>
                  <li><strong>부하 균등화 (Load Balancing):</strong> 일부 특정 전문가에게만 연산 요청이 몰릴 경우 하드웨어 연산 유휴(Gossip/Skew)가 심화됩니다. 라우팅 손실(Routing Loss) 함수를 적용하여 토큰을 고르게 분배해야 합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer",
                authors: "Shazeer et al.",
                venue: "ICLR 2017",
                link: "https://arxiv.org/abs/1701.06538",
                note: "트랜스포머 레이어에 스파스 게이팅 MoE를 도입하는 초석을 다진 논문"
              },
              {
                title: "Mixtral of Experts",
                authors: "Jiang et al.",
                venue: "ArXiv 2024",
                link: "https://arxiv.org/abs/2401.04088",
                note: "상용 수준의 고성능 오픈소스 MoE 모델 설계 및 추론 속도 입증"
              }
            ],
            resources: [
              {
                title: "DeepSpeed-MoE Tutorial",
                link: "https://www.deepspeed.ai/tutorials/mixture-of-experts/"
              }
            ]
          },
          {
            id: "long_context",
            title: "Long Context Processing",
            summary: "수백만 토큰의 문맥 창(Context Window) 처리를 위한 어텐션 및 통신 최적화",
            content: `
              <h3>초장거리 문맥 처리 시스템 최적화</h3>
              <p>문맥 창(Context Window)의 한계를 확장하기 위한 트렌드로, 최근 모델들은 128K를 넘어 1M+ 이상의 시퀀스를 지원하고 있습니다. 시퀀스 길이가 늘어남에 따라 계산 복잡도가 제곱(\\( O(N^2) \\))으로 증가하며 대규모 GPU 메모리가 요구됩니다.</p>

              <div class="info-box">
                <h4>최신 시퀀스 확장 기술</h4>
                <ul>
                  <li><strong>FlashAttention-1/2/3:</strong> GPU SRAM의 고속 읽기/쓰기 특성을 최대한 활용하여 GPU 전역 메모리(HBM) 접근을 최소화하고, 타일링(Tiling) 기법을 통해 Attention Map을 조각내 계산함으로써 속도를 비약적으로 단축시킵니다. FlashAttention-3는 비동기 하드웨어 파이프라인 및 FP8 데이터 포맷에 최적화되었습니다.</li>
                  <li><strong>Ring Attention:</strong> 시퀀스 차원을 분할하여 링 형태의 네트워크 위에서 GPU 간 토큰 조각을 Round-robin 방식으로 통신(Send/Receive)하며 어텐션을 계산합니다. 개별 GPU의 메모리 한계를 우회하여 사실상 무제한의 컨텍스트 학습을 실현합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
                authors: "Tri Dao et al.",
                venue: "NeurIPS 2022",
                link: "https://arxiv.org/abs/2205.14135",
                note: "SRAM과 HBM의 메모리 대역폭 한계를 극복한 IO-aware 어텐션 알고리즘 제안"
              },
              {
                title: "Ring Attention with Blockwise Transformers for Near-Infinite Context",
                authors: "Liu et al.",
                venue: "ICLR 2024",
                link: "https://arxiv.org/abs/2310.01889",
                note: "GPU 링 네트워킹을 활용하여 시퀀스를 분산 연산하는 Ring Attention 최초 구현"
              }
            ],
            resources: [
              {
                title: "FlashAttention GitHub project",
                link: "https://github.com/Dao-AILab/flash-attention"
              }
            ]
          }
        ]
      },
      {
        id: "distributed_training",
        title: "Distributed Training",
        items: [
          {
            id: "parallelism",
            title: "3D Parallelism",
            summary: "모델 스케일 한계를 깨기 위한 DP, TP, PP 병렬화 조합",
            content: `
              <h3>3차원 병렬 학습 구조 (3D Parallelism)</h3>
              <p>일반적으로 단일 GPU 메모리 용량을 초과하는 매개변수를 가진 대형 모델을 학습하기 위해 Data Parallelism(DP), Tensor Parallelism(TP), Pipeline Parallelism(PP)을 혼합하여 클러스터를 설계합니다.</p>
              
              <div class="info-box">
                <h4>3차원 분산 병렬 기법 개요</h4>
                <ol>
                  <li><strong>데이터 병렬화 (DP):</strong> 학습 데이터를 분할하여 여러 디바이스에 공급하고 각자 로컬 그래디언트를 계산한 후 전체 통신(All-Reduce)을 통해 동기화합니다.</li>
                  <li><strong>텐서 병렬화 (TP):</strong> 단일 트랜스포머 레이어 내의 행렬 연산을 여러 GPU가 분할하여 실행합니다. GPU 장비 간 초고속 내부 대역폭(NVLink 등)이 수반되어야 효율이 납니다.</li>
                  <li><strong>파이프라인 병렬화 (PP):</strong> 신경망 레이어들을 그룹화하여 서로 다른 머신에 분산하고 실행 흐름을 파이프라인 스테이지 형태로 관리합니다. 마이크로배치 스케줄링 기법(1F1B)을 통해 버블 시간을 극소화합니다.</li>
                </ol>
              </div>
            `,
            papers: [
              {
                title: "Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism",
                authors: "Shoeybi et al.",
                venue: "ArXiv 2019",
                link: "https://arxiv.org/abs/1909.08053",
                note: "NVIDIA에서 텐서 분할을 통한 트랜스포머 분산 학습 가이드라인을 정립한 고전적 논문"
              }
            ],
            resources: [
              {
                title: "PyTorch FSDP Tutorial",
                link: "https://pytorch.org/tutorials/intermediate/FSDP_tutorial.html"
              }
            ]
          },
          {
            id: "zero_optimizer",
            title: "ZeRO Optimizer",
            summary: "데이터 병렬 학습 시 중복 가중치, 옵티마이저 상태 분할로 메모리 절감",
            content: `
              <h3>ZeRO (Zero Redundancy Optimizer) 원리</h3>
              <p>기반 분산 학습(DP) 구조에서는 가중치(Parameters), 그래디언트(Gradients), 옵티마이저 상태(Optimizer States)가 각 GPU에 중복되어 존재합니다. ZeRO는 이러한 중복성을 제거하여 메모리 효율을 극대화합니다.</p>
              
              <div class="info-box">
                <h4>ZeRO의 3가지 단계 (Stages)</h4>
                <ul>
                  <li><strong>ZeRO-1:</strong> Adam 옵티마이저의 상태(기존 메모리의 최대 75% 점유)를 데이터 병렬 그룹 내의 GPU들에 골고루 파티셔닝합니다.</li>
                  <li><strong>ZeRO-2:</strong> 역전파 과정에서 산출되는 그래디언트까지 결합하여 파티셔닝함으로써 더 넓은 메모리를 보장합니다.</li>
                  <li><strong>ZeRO-3:</strong> 순전파 및 역전파 계산 과정에 필요한 순간에만 네트워크 통신을 통해 레이어의 가중치를 가져오고(All-Gather), 연산이 끝나면 가중치를 즉각 폐기(Reduce-Scatter)하는 방식으로 가중치 전체를 분할 보관합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models",
                authors: "Rajbhandari et al.",
                venue: "SC 2020",
                link: "https://arxiv.org/abs/1910.02054",
                note: "DeepSpeed의 핵심 아이디어인 중복 메모리 제거 기법 ZeRO 1단계, 2단계, 3단계 공식 제안"
              }
            ],
            resources: [
              {
                title: "DeepSpeed Library Documentation",
                link: "https://www.deepspeed.ai/"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "compute",
    title: "Compute & Accelerator",
    icon: "cpu",
    subcategories: [
      {
        id: "processors",
        title: "Processors",
        items: [
          {
            id: "gpu_architecture",
            title: "GPU Architecture",
            summary: "NVIDIA Hopper/Blackwell/Rubin 가속기 아키텍처 변천사 및 HBM4 통합 설계",
            content: `
              <h3>NVIDIA GPU 아키텍처 변천 (Hopper, Blackwell, Rubin)</h3>
              <p>NVIDIA GPU 아키텍처는 세대를 거듭하며 학습 성능뿐만 아니라 추론 가속과 패키징 기술을 확장해 왔습니다.</p>
              
              <div class="info-box">
                <h4>NVIDIA AI 가속기 로드맵 핵심 요약</h4>
                <ul>
                  <li><strong>Hopper (H100/H200):</strong> 트랜스포머 가속을 위한 1세대 Transformer Engine 도입, 메모리 벽 해소를 위해 HBM3(H200에서 HBM3e)를 통합 탑재했습니다.</li>
                  <li><strong>Blackwell (B200/GB200):</strong> 두 개의 GPU 다이(Die)를 10TB/s 고속 버스 링크로 연결하는 칩렛(Chiplet) 구조와 FP4 연산을 가속하는 2세대 Transformer Engine을 탑재하고, 72개 GPU를 하나로 묶는 GB200 NVL72 수랭식 랙을 수립했습니다.</li>
                  <li><strong>Vera Rubin (Rubin / Rubin Ultra):</strong> 2025~2026년 대규모 분산/에이전트 AI 가속을 위해 설계된 아키텍처로, TSMC 3nm 공정 및 2개의 연산 다이와 2개의 I/O 다이를 CoWoS-L 공정으로 결합하고 <strong>차세대 6세대 HBM4(초고속 적층 메모리)</strong>를 통합했습니다.</li>
                </ul>
              </div>

              <h3>1. GPU 아키텍처 진화의 역사 (Hopper에서 Blackwell, 그리고 Rubin까지)</h3>
              <p>현대 인공지능 컴퓨팅의 근간을 이루는 NVIDIA의 가속기 아키텍처는 단일 칩 성능의 극한을 넘어서 클러스터 수준의 연산 능력을 극대화하는 방향으로 발전해 왔습니다. Hopper 아키텍처는 가상 메모리 관리와 FP8 연산 포맷을 처음으로 지원했으며, Blackwell은 이를 칩렛 구조로 확장하고 최초로 FP4 포맷을 하드웨어 수준에서 연산하기 시작했습니다. 향후 도입될 Rubin 아키텍처는 단순한 컴퓨트 성능 향상을 넘어 HBM4 적층 구조와 대형 액체 냉각 패널 설계를 완전히 일체화한 3D 가속 패키징의 정점을 보여줍니다.</p>

              <h3>2. 2.5D 및 3D 칩렛(Chiplet) 실리콘 패키징 기술</h3>
              <p>Blackwell과 Rubin 아키텍처의 핵심은 단일 대형 실리콘 다이의 수율 한계를 극복하기 위해 복수의 다이를 정밀한 실리콘 인터포저 위에 얹어 연결하는 2.5D CoWoS-L(Chip-on-Wafer-on-Substrate with Local Silicon Interconnect) 공정입니다. 다이 간 데이터 인터커넥트(D2D Link)는 양방향 10 TB/s의 무손실 대역폭을 보장하여, 프로그래머는 이를 하나의 거대한 단일 GPU 다이로 인식하고 제어할 수 있습니다.</p>
              <img src="images/blackwell_chiplet_design.png" alt="Blackwell Dual-Die Chiplet Design" />
              <div class="image-caption">그림 1: Blackwell 2.5D CoWoS-L 칩렛 구조 및 D2D 링크 배선 아키텍처</div>
              
              <h4>2.5D Chiplet GPU 패키징 구조 (CoWoS-L)</h4>
              <svg viewBox="0 0 500 220" width="100%" class="svg-diagram">
                <style>
                  .svg-bg { fill: #11131e; rx: 12px; }
                  .interposer { fill: #2c2f44; stroke: #4f46e5; stroke-width: 2; }
                  .die { fill: #312e81; stroke: #6366f1; stroke-width: 2; }
                  .hbm { fill: #064e3b; stroke: #10b981; stroke-width: 2; }
                  .label { font-family: 'Inter', sans-serif; font-size: 11px; fill: #f3f4f6; text-anchor: middle; font-weight: bold; }
                  .sublabel { font-family: 'Inter', sans-serif; font-size: 9px; fill: #9ca3af; text-anchor: middle; }
                  .conn-line { stroke: #818cf8; stroke-dasharray: 3; stroke-width: 1.5; }
                  .caption { font-family: 'Inter', sans-serif; font-size: 12px; fill: #818cf8; font-weight: bold; text-anchor: middle; }
                </style>
                <rect width="500" height="220" class="svg-bg" />
                
                <!-- Package Substrate -->
                <rect x="30" y="150" width="440" height="25" rx="4" fill="#1e1b4b" stroke="#3730a3" stroke-width="2" />
                <text x="250" y="167" class="label" fill="#a5b4fc">Package Substrate (Organic)</text>
                
                <!-- Silicon Interposer -->
                <rect x="50" y="110" width="400" height="20" rx="3" class="interposer" />
                <text x="250" y="124" class="label">Silicon Interposer (CoWoS / TSV)</text>
                
                <!-- HBM Stack Left -->
                <rect x="70" y="40" width="80" height="55" rx="6" class="hbm" />
                <text x="110" y="65" class="label">HBM Stack</text>
                <text x="110" y="80" class="sublabel">(HBM3e / HBM4)</text>
                
                <!-- GPU Compute Die 1 -->
                <rect x="170" y="40" width="75" height="55" rx="6" class="die" />
                <text x="207" y="65" class="label">GPU Die 1</text>
                <text x="207" y="80" class="sublabel">(Compute/SMs)</text>
                
                <!-- GPU Compute Die 2 -->
                <rect x="255" y="40" width="75" height="55" rx="6" class="die" />
                <text x="292" y="65" class="label">GPU Die 2</text>
                <text x="292" y="80" class="sublabel">(Compute/SMs)</text>
                
                <!-- HBM Stack Right -->
                <rect x="350" y="40" width="80" height="55" rx="6" class="hbm" />
                <text x="390" y="65" class="label">HBM Stack</text>
                <text x="390" y="80" class="sublabel">(HBM3e / HBM4)</text>
                
                <!-- Inter-Die Link (Blackwell/Rubin) -->
                <path d="M 245 68 L 255 68" stroke="#f43f5e" stroke-width="4" stroke-linecap="round" />
                <text x="250" y="25" class="caption" fill="#f43f5e">Ultra-High-Speed D2D Link (10 TB/s)</text>
                
                <!-- Connectors (TSVs/Microbumps) -->
                <line x1="110" y1="95" x2="110" y2="110" class="conn-line" />
                <line x1="207" y1="95" x2="207" y2="110" class="conn-line" />
                <line x1="292" y1="95" x2="292" y2="110" class="conn-line" />
                <line x1="390" y1="95" x2="390" y2="110" class="conn-line" />
              </svg>

              <h3>3. SM(Streaming Multiprocessor) 내부 구조와 동작 메커니즘</h3>
              <p>NVIDIA GPU의 핵심 연산 엔진인 SM은 수많은 코어와 제어 장치들의 집합입니다. 각 SM 내에는 명령어를 디코딩하고 워프(Warp) 단위로 스케줄링하는 Warp Scheduler가 존재하며, 부동 소수점 연산을 전담하는 FP32/FP64 코어, 정수 연산을 전담하는 INT32 코어, 그리고 행렬 곱셈 연산을 고속으로 처리하는 전용 하드웨어인 <strong>Tensor Core</strong>가 내장되어 대규모 행렬 계산을 비동기식으로 실행합니다.</p>

              <h3>4. Transformer Engine의 세대 교체와 다이내믹 정밀도</h3>
              <p>Transformer Engine은 거대 모델의 부동 소수점 학습 과정에서 지수(Exponent)와 가수(Mantissa)의 비트 수를 동적으로 리스케일링하여 최적의 정밀도 수준을 유지하는 특허 기술입니다. Blackwell에 적용된 2세대 엔진은 dynamic quantization 알고리즘을 사용해 연산 정밀도를 분석하며, 정밀도 유실 위험이 큰 레이어는 자동으로 FP8 또는 FP16으로 승격시키고, 패턴이 단순한 연산은 FP4로 강등시켜 FP16 대비 최대 4배의 처리량 상승 효과를 얻습니다.</p>

              <h3>5. GPU 메모리 계층 구조와 레지스터 파일 관리</h3>
              <p>GPU SM 내부에는 레이턴시가 1사이클 미만인 레지스터 파일(Register File)과 캐시가 존재합니다. 스레드가 최대 1024개까지 런칭되면 메모리 접근 충돌을 회피하기 위해 컴파일러 단에서 스레드당 레지스터 할당량을 엄격히 통제합니다. 레지스터 병목이 일어나면 데이터를 고속 SRAM(L1 캐시/공유 메모리)이나 상대적으로 느린 GPU 외부의 HBM 메모리로 밀어내는 레지스터 스필(Register Spill) 현상이 나타나고, 이는 즉각 연산 레이턴시 상승으로 직결됩니다.</p>

              <h3>6. HBM4 적층 설계와 2048-bit 메모리 인터페이스</h3>
              <p>차세대 메모리의 핵심인 HBM4는 기존 HBM3e가 가지고 있던 1024비트의 데이터 인터페이스 버스 폭을 **2048비트**로 두 배 확장하여 병목을 없앱니다. 또한, HBM 스택 아래에서 로직 컨트롤러 역할을 하는 베이스 다이(Base Die)가 일반 DRAM 공정이 아닌 TSMC/삼성의 <strong>최첨단 로직 파운드리 공정</strong>으로 대체 제조되어 GPU와의 신호 일관성과 전송 에너지 효율성을 30% 이상 극대화합니다.</p>
              <img src="images/hbm4_stacked_memory.png" alt="HBM4 Stacked Memory Architecture" />
              <div class="image-caption">그림 2: HBM4 3D 적층 DRAM 구조 및 2048-bit 로직 베이스 다이 결합 모델</div>

              <h3>7. 초고속 인터커넥트 기술: 5세대 NVLink와 NVSwitch</h3>
              <p>NVLink 기술은 멀티 노드 시스템 설계의 물리적 한계를 완전히 허물어줍니다. 5세대 NVLink는 단일 Blackwell GPU 기준 초당 1.8 TB/s의 전송 대역폭을 전달합니다. 이를 제어하는 NVSwitch 패브릭 칩은 내부적으로 dynamic routing을 지원하여 패킷 드롭이 전혀 발생하지 않는 non-blocking 스위칭 토폴로지를 구성합니다.</p>

              <h3>8. 전력 공급 및 액체 냉각(Liquid Cooling) 기술</h3>
              <p>GB200 서버 랙 하나에서 소모하는 최대 전력은 약 **120 kW**에 도달합니다. 이를 일반 공랭(Air Cooling) 방식으로 냉각하는 것은 물리적으로 불가능하므로, 차세대 AI 데이터센터는 냉각수가 GPU 칩 표면의 콜드 플레이트(Cold Plate)를 직접 흐르며 열을 회수하는 폐루프 액체 냉각 시스템 기술이 전면 도입됩니다. 이로 인해 인프라 수준의 PUE(Power Usage Effectiveness)가 1.05 이하로 수렴하게 됩니다.</p>

              <h3>9. 시스톨릭 어레이(Systolic Array) 연산 유닛과의 아키텍처 비교</h3>
              <p>구글의 TPU나 AI 반도체 스타트업들의 가속기에 흔히 사용되는 시스톨릭 어레이(Systolic Array) 방식은 데이터가 바둑판 형태의 프로세서 셀 망을 타고 흐르며 레지스터 접근 없이 인접 셀과 즉시 곱셈/덧셈을 처리하므로 하드웨어 비용 대비 효율성이 높습니다. 반면 NVIDIA GPU는 풍부한 레지스터 파일과 유연한 제어 흐름(Control Flow) 구조를 제공하여 복잡하고 범용적인 수학식 연산에 매우 우수한 적응성을 지닙니다.</p>

              <h3>10. FP4 수치 포맷과 양자화 오차 최소화 기법</h3>
              <p>FP4는 1비트의 부호(Sign), 2비트의 지수(Exponent), 1비트의 가수(Mantissa) 구조로 극단적인 축소가 이루어진 정밀도 포맷입니다. 수치 표현 공간이 단 16개에 불과하므로, 가중치 분포의 최대-최소 범위를 정교하게 샘플링하고 미세 단위 스케일링 팩터(Scaling Factor) 행렬인 \\( S \\)를 도입하여 원래 정밀도의 데이터를 복원 연산하는 특수 활성화 필터링 처리가 수반됩니다.</p>
              
              <div class="info-box">
                <h4>양자화 변환 수학식</h4>
                <p>가중치 \\( W_{fp16} \\)를 4비트 포맷 \\( W_{fp4} \\)로 스케일링 팩터 \\( S \\)와 함께 매핑하는 기본 관계식:</p>
                <p style="text-align: center; font-size: 1.15rem; margin: 12px 0;">
                  \\( W_{fp16} \\approx S \\times W_{fp4} \\)
                </p>
                <p>여기서 \\( S \\)는 Outlier(극단치)의 영향을 고르게 분산하여 양자화에 따른 정확도(Accuracy) 저하를 방지합니다.</p>
              </div>

              <h3>11. 초대형 클러스터의 신뢰성 및 장애 방지(RAS) 아키텍처</h3>
              <p>수만 개의 GPU를 묶어 몇 달간 학습을 계속하면 하드웨어 불량이 일상적으로 발생합니다. 이에 대응하기 위해 Blackwell 이상 아키텍처에는 RAS(Reliability, Availability, and Serviceability) 엔진이 기본 장착되어, 온칩 SRAM의 에러를 정정(ECC)하고 실시간 통신 패킷 이상을 수백 마이크로초 이내에 감지해 패킷을 자동 재전송함으로써 학습이 예기치 않게 다운되는 중단 사고를 미연에 방지합니다.</p>

              <h3>12. 하드웨어 가속을 극대화하는 소프트웨어 런타임 (CUDA & Triton)</h3>
              <p>하드웨어 아키텍처가 발전할수록 이를 컴파일링하는 런타임의 역할이 치명적으로 중요해집니다. CUDA 프로그래밍의 Warp Level Primitive 연산(예: __shfl_sync)은 워프 내부 스레드 간 초고속 데이터 셔플을 보장하며, Triton 컴파일러는 블록 연산의 메모리 레이아웃을 내부 중간 언어(IR)로 최적화해 GPU 메모리 컨트롤러가 연속된 어드레스 대역을 하나의 큰 버스트 전송(Coalesced Memory Access)으로 퍼내도록 빌드합니다.</p>

              <h3>13. 랙 스케일 아키텍처: GB200/GR200 NVL72 시스템 설계</h3>
              <p>랙 수준의 통합 컴퓨팅 시스템인 GB200 NVL72는 Grace CPU 36개와 Blackwell GPU 72개를 동축 구리 케이블(Copper Backplane) 백플레인으로 직접 설계했습니다. 구리 케이블 전송 방식은 광 인터커넥트 대비 전송 지연이 극히 짧고 전력 소모량이 거의 제로에 가까워, 72개의 GPU가 단 하나의 거대한 46.8 TB 대역을 갖춘 가상 메모리 단일 풀 GPU 클러스터 도메인으로 매끄럽게 엮이게 만듭니다.</p>
              <img src="images/gb200_rack_system.png" alt="GB200 NVL72 Rack System" />
              <div class="image-caption">그림 3: GB200 NVL72 액체 냉각 수랭 랙 및 고밀도 백플레인 결합 구성</div>

              <h3>14. Rubin Ultra 및 2nm 공정 기반 미래 아키텍처 전망</h3>
              <p>2026년 이후 출격을 예고한 Rubin 아키텍처는 TSMC의 차세대 3nm 또는 2nm 나노 공정 하에서 3차원 적층 가공을 완수합니다. 나노 공정 세대 교체를 통해 온칩 트랜지스터 밀도가 Hopper 대비 수십 배로 늘어남에 따라 하드웨어 가속 수준은 가파르게 성장을 지속할 것이며, 이는 거대 멀티모달 자율 에이전트 인공지능 시대를 견인하는 핵심 원동력이 될 것입니다.</p>
            `,
            papers: [
              {
                title: "NVIDIA Blackwell Architecture Whitepaper",
                authors: "NVIDIA Corporation",
                venue: "Technical Report 2024",
                link: "https://resources.nvidia.com/en-us-blackwell-architecture",
                note: "FP4 연산, 2세대 Transformer Engine, 대칭 구조의 Blackwell 아키텍처 명세서"
              },
              {
                title: "NVIDIA Rubin Architecture Technical Announcement",
                authors: "NVIDIA Corporation",
                venue: "COMPUTEX Keynote 2024/2025",
                link: "https://www.nvidia.com/en-us/about-nvidia/press-releases/",
                note: "3nm 공정 설계, 288GB HBM4 통합 및 Vera Rubin NVL72 플랫폼 로드맵 발표 자료"
              }
            ],
            resources: [
              {
                title: "NVIDIA Blackwell Overview",
                link: "https://www.nvidia.com/en-us/data-center/blackwell/"
              },
              {
                title: "NVIDIA Rubin Platform Details",
                link: "https://developer.nvidia.com/blog/nvidia-rubin-platform-next-generation-ai-computing/"
              }
            ]
          },
          {
            id: "tpu_npu",
            title: "TPU & NPU Architecture",
            summary: "Google TPU v6 (Trillium) 및 모바일/서버 NPU에서의 Systolic Array 연산 개념",
            content: `
              <h3>구글의 차세대 TPU v6 (Trillium) 및 NPU</h3>
              <p>Google은 AI 전용 실리콘 시장을 이끌어오며 6세대 TPU 아키텍처인 <strong>Trillium (TPU v6)</strong>을 발표했습니다. 이전 TPU v5p 대비 칩당 컴퓨트 밀도가 4.7배 증가했으며, HBM 메모리 대역폭과 용량이 각각 2배씩 대폭 늘어났습니다.</p>

              <div class="info-box">
                <h4>Trillium의 하드웨어 설계 장점</h4>
                <ul>
                  <li><strong>Optical Circuit Switch (OCS):</strong> TPU 클러스터를 엮을 때 전기식 대신 빛 신호인 광 스위치를 사용하여 저비용, 고속, 재구성 가능한 저지연 인터커넥트를 보장합니다.</li>
                  <li><strong>Matrix Multiply Unit (MXU):</strong> TPU의 핵심인 시스톨릭 어레이 MXU 연산 유닛과 강력한 백엔드 벡터 프로세서를 보존하고 JAX/XLA 컴파일러와 완벽 호환됩니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "Google TPU v6: Trillium Architecture and Scalability",
                authors: "Google Technical Team",
                venue: "Google Research 2024",
                link: "https://cloud.google.com/blog/products/compute/introducing-trillium-our-6th-gen-tpu",
                note: "구글의 6세대 Trillium TPU의 연산 가속, 메모리 인터포저, 3D 토러스 망 설명"
              }
            ],
            resources: [
              {
                title: "Google Cloud Trillium Docs",
                link: "https://cloud.google.com/tpu/docs/v6"
              }
            ]
          }
        ]
      },
      {
        id: "programming_runtime",
        title: "Programming Model",
        items: [
          {
            id: "cuda_concepts",
            title: "CUDA Programming Model",
            summary: "GPU 프로그래밍의 스레드 계층(Grid-Block-Thread)과 메모리 모델 계층",
            content: `
              <h3>CUDA 프로그래밍 모델의 기하학적 기초</h3>
              <p>CUDA는 C/C++ 기반으로 GPU에서 병렬 실행될 함수(Kernel)를 정의합니다. 수만 개 스레드의 논리적 구도를 계층적으로 관리합니다.</p>
              
              <div class="info-box">
                <h4>스레드 조직 계층 (Thread Hierarchy)</h4>
                <ul>
                  <li><strong>Thread Block:</strong> 동시에 실행될 스레드들의 묶음으로, 하나의 SM에 할당되어 하드웨어 자원을 공유하고 동기화할 수 있습니다. 1개 블록은 최대 1024개 스레드를 가질 수 있습니다.</li>
                  <li><strong>Grid:</strong> 스레드 블록들의 배열입니다. 커널을 런칭할 때 크기를 지정합니다.</li>
                  <li><strong>Warp (워프):</strong> 실제 하드웨어가 실행하는 최소 스레드 배치(32개 스레드)입니다. SIMT 방식을 준수합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "CUDA Programming Guide",
                authors: "NVIDIA",
                venue: "NVIDIA Documentation",
                link: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html",
                note: "CUDA 소프트웨어 개발의 핵심 참고서이자 아키텍처 바이블"
              }
            ],
            resources: [
              {
                title: "CUDA Refresher Series - NVIDIA Blog",
                link: "https://developer.nvidia.com/blog/tag/cuda-refresher/"
              }
            ]
          },
          {
            id: "triton",
            title: "Triton Compiler",
            summary: "OpenAI의 Python 기반 GPU 프로그래밍 언어 및 컴파일러 아키텍처",
            content: `
              <h3>OpenAI Triton의 태동과 작동 원리</h3>
              <p>OpenAI Triton은 파이썬 코드를 컴파일하여 최적의 CUDA 커널을 직접 빌드해주는 DSL(Domain-Specific Language)입니다.</p>
              
              <div class="info-box">
                <h4>Triton의 핵심 가치</h4>
                <ul>
                  <li>스레드 병렬성, 블록 메모리 로딩, 동기화(Barrier) 등 복잡한 CUDA 세부 구현을 컴파일러가 자동 최적화합니다.</li>
                  <li>개발자는 복수 개의 원소 연산 대신 블록-수준 연산(Block-level operations)을 정의하는 파이썬 고수준 API에 집중할 수 있습니다.</li>
                  <li>PyTorch Core 아키텍처(PyTorch 2.0+ Inductor)의 기본 백엔드로 채택되어 모델 실행 속도를 가속합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "Triton: An Intermediate Language and Compiler for Tiled Neural Network Computations",
                authors: "Tillet et al.",
                venue: "MAPL 2019",
                link: "https://www.eecs.harvard.edu/~htillet/papers/triton.pdf",
                note: "OpenAI Triton 컴파일러의 블록 연산 중간 언어(IR) 설계 및 스케줄링 구조 기술"
              }
            ],
            resources: [
              {
                title: "Triton Compiler GitHub",
                link: "https://github.com/triton-lang/triton"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "memory",
    title: "Memory System",
    icon: "database",
    subcategories: [
      {
        id: "high_bandwidth",
        title: "High-Bandwidth & Off-Chip",
        items: [
          {
            id: "hbm_architecture",
            title: "HBM (HBM3e / HBM4)",
            summary: "TSV 기술 기반 초고대역폭 적층 메모리 기술 및 차세대 HBM4 3D 적층 구조",
            content: `
              <h3>고대역폭 메모리(HBM)의 발전 및 HBM4 트렌드</h3>
              <p>메모리 전송 속도가 하드웨어 연산 성능을 따라가지 못하는 **메모리 벽(Memory Wall)** 문제로 인해, HBM은 현대 AI 가속기 패키징의 필수 요소가 되었습니다. 현재 주류인 HBM3e를 넘어 **HBM4(6세대 HBM)**의 개발이 가속화되고 있습니다.</p>
              
              <div class="info-box">
                <h4>HBM4의 주요 변화와 구조적 특징</h4>
                <ul>
                  <li><strong>베이스 다이(Base Die) 변화:</strong> 기존 HBM의 베이스 다이는 일반 메모리 공정으로 제조되었으나, HBM4부터는 GPU와의 전기적 결합성 및 초고속 데이터 전송 속도를 맞추기 위해 TSMC, 삼성, 인텔의 **로직 선단 공정(Logic Process Foundry)**으로 직접 제조됩니다.</li>
                  <li><strong>3D 패키징 및 2048비트 대역폭:</strong> 기존 1024비트의 데이터 인터페이스 버스 폭을 2배인 2048비트로 확장하여, 메모리 대역폭을 수 TB/s를 넘어 극대화합니다. 실리콘 인터포저 위에서의 2.5D 배치를 넘어 다이 다이렉트 3D 적층(3D Stacked) 구조 연구가 추진 중입니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "High-Bandwidth Memory (HBM) Technology Trends and HBM4 Standard",
                authors: "JEDEC Standards Committee",
                venue: "JEDEC Draft Report 2024",
                link: "https://www.jedec.org",
                note: "베이스 다이의 파운드리 통합 및 2048비트 버스 폭 인터페이스 규격 분석"
              }
            ],
            resources: [
              {
                title: "SK hynix HBM Roadmap",
                link: "https://news.skhynix.com"
              }
            ]
          },
          {
            id: "unified_memory",
            title: "Unified Memory",
            summary: "CPU 호스트 메모리와 GPU 로컬 메모리를 가상 주소 공간으로 묶는 아키텍처",
            content: `
              <h3>통합 메모리 아키텍처 (Unified Memory)</h3>
              <p>통합 메모리 아키텍처는 CPU와 GPU가 동일한 가상 메모리 포인터 공간을 공유하여, 코딩 편의성이 증가하고 GPU 메모리 한계를 초과하는 모델 학습을 지원합니다.</p>
              
              <div class="info-box">
                <h4>동작 기작</h4>
                <p>가동 중에 GPU가 아직 로컬 HBM에 적재되지 않은 가상 메모리 주소에 액세스하면 하드웨어 수준의 Page Fault가 발생하고, 고속 링크를 통해 CPU 호스트 메모리의 물리 페이지를 GPU 메모리로 마이그레이션(Page Migration)합니다.</p>
              </div>
            `,
            papers: [
              {
                title: "Unified Memory in CUDA Guide",
                authors: "NVIDIA Developer Team",
                venue: "Technical Guide",
                link: "https://developer.nvidia.com/blog/unified-memory-cuda-beginners/",
                note: "통합 메모리의 기초 개념과 동작 및 성능 영향에 관한 프로그래머 가이드"
              }
            ],
            resources: [
              {
                title: "NVIDIA unified memory docs",
                link: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html"
              }
            ]
          },
          {
            id: "cxl",
            title: "CXL (Compute Express Link)",
            summary: "PCIe 버스 기반의 메모리 풀링 및 CPU-GPU 간 캐시 일관성(Cache Coherency) 확보 기술",
            content: `
              <h3>CXL(Compute Express Link) 메모리 확장 기술</h3>
              <p>대형 LLM 학습 및 그래프 학습에서 GPU HBM 메모리 용량 부족(OOM) 현상은 만성적인 문제이며, 초고가의 HBM 탑재 GPU 추가 구매는 인프라 비용 부담을 키웁니다. **CXL**은 PCIe 물리 인터페이스를 활용하여 서로 다른 디바이스 간에 저지연 캐시 일관적(Cache-Coherent) 메모리 공유 및 확장을 제공하는 개방형 업계 표준입니다.</p>

              <div class="info-box">
                <h4>CXL 프로토콜의 3가지 핵심 기둥</h4>
                <ul>
                  <li><strong>CXL.io:</strong> 장치 검색, 구성, 인터럽트 등 전통적인 PCIe와 동일한 필수 제어 프로토콜입니다.</li>
                  <li><strong>CXL.cache:</strong> 가속기(예: GPU, NPU)가 CPU의 시스템 메모리를 직접 low-latency로 액세스 및 캐싱할 수 있게 해줍니다.</li>
                  <li><strong>CXL.mem:</strong> CPU가 가속기나 별도의 CXL 메모리 확장 장치(Memory Expander)의 메모리 슬롯을 시스템 메모리 맵에 매핑하여 마치 자체 RAM처럼 사용(Memory Pooling)할 수 있게 지원합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "CXL: Compute Express Link Consortium Specification 3.1",
                authors: "CXL Consortium",
                venue: "Consortium Standard 2023",
                link: "https://www.computeexpresslink.org",
                note: "멀티 호스트 메모리 풀링, 백플레인 패브릭 및 리소스 쉐어링 아키텍처 표준 기술"
              }
            ],
            resources: [
              {
                title: "Intel CXL Resource Center",
                link: "https://www.intel.com/content/www/us/en/developer/topic-technology/compute-express-link.html"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "network",
    title: "Interconnect & Network",
    icon: "globe",
    subcategories: [
      {
        id: "scale_up",
        title: "Scale-Up (Node)",
        items: [
          {
            id: "nvlink",
            title: "NVLink / NVSwitch",
            summary: "단일 노드 내 다중 GPU 간 초고속 내부 링크 및 스위치 패브릭 시스템 구조",
            content: `
              <h3>NVLink 및 NVSwitch의 결합</h3>
              <p>NVIDIA GPU 간 전용 링크인 **NVLink**와 물리적 멀티 스위치 칩셋인 **NVSwitch**는 대규모 텐서 병렬 학습의 성공을 이끈 일등 공신입니다.</p>
              
              <div class="info-box">
                <h4>5세대 NVLink (Blackwell 탑재) 원리</h4>
                <ul>
                  <li><strong>대역폭 극대화:</strong> Blackwell GPU 한 칩당 양방향 최대 1.8 TB/s의 메모리 전송 폭을 제공하여 Hopper(900 GB/s) 대비 2배의 통신 효율을 보장합니다.</li>
                  <li><strong>NVLink Switch System (NVL72):</strong> 72개의 Blackwell GPU가 구동되는 랙 스택 내부를 구리 케이블 백플레인으로 통일 연결하여, 72개의 GPU가 완전 무손실로 데이터 공유 네트워크를 타는 초대형 가상 GPU 도메인을 수립합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "NVIDIA DGX Blackwell Architecture Technical Brief",
                authors: "NVIDIA",
                venue: "Technical Document 2024",
                link: "https://resources.nvidia.com",
                note: "Grace CPU와 Blackwell GPU를 묶는 초고속 코퍼 패브릭 및 NVSwitch 랙 연결 분석"
              }
            ],
            resources: [
              {
                title: "NVLink and NVSwitch Overview",
                link: "https://www.nvidia.com/en-us/data-center/nvlink/"
              }
            ]
          }
        ]
      },
      {
        id: "scale_out",
        title: "Scale-Out (Network)",
        items: [
          {
            id: "infiniband_roce",
            title: "InfiniBand vs RoCE (RDMA)",
            summary: "수천 대의 서버 장비를 노드로 묶어주는 초고속 저지연 네트워킹 기술 및 RDMA",
            content: `
              <h3>대규모 분산 클러스터용 저지연 네트워크</h3>
              <p>서버 여러 대를 연결해 성능을 극대화하려면 GPU가 호스트 OS 커널 간섭 없이 다른 컴퓨터의 메모리 주소 영역에 직접 접촉하는 <strong>RDMA (Remote Direct Memory Access)</strong> 네트워킹 기술이 절대적 지위를 가집니다.</p>
              
              <div class="info-box">
                <h4>RDMA 실현 2대 산맥</h4>
                <ul>
                  <li><strong>InfiniBand (인피니밴드):</strong> 최고 속도와 최저 지연시간을 구현하는 네트워크 아키텍처로, 하드웨어 전반에 흐름 제어가 기본 내장되어 무손실 데이터 보장을 약속합니다.</li>
                  <li><strong>RoCE:</strong> 기존의 표준 이더넷 망 위에서 UDP/IP 헤더를 결합하여 RDMA를 실현하는 기술입니다. 인프라 설치 비용이 저렴하나 PFC 등을 통해 스위치 수준에서 정교하게 무손실망을 기획해야 합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "A Case for RDMA in Data Center Applications",
                authors: "Microsoft Research",
                venue: "Technical Report",
                link: "https://www.microsoft.com/en-us/research/publication/a-case-for-rdma-in-data-center-applications/",
                note: "데이터 센터 스케일에서 RDMA 기반 가속이 가져오는 저지연 성능 이점에 대한 초창기 연구 논문"
              }
            ],
            resources: [
              {
                title: "Mellanox (NVIDIA) Networking Academy",
                link: "https://www.nvidia.com/en-us/networking/"
              }
            ]
          },
          {
            id: "uec",
            title: "Ultra Ethernet Consortium (UEC)",
            summary: "차세대 대규모 AI 분산 환경용 개방형 표준 이더넷 아키텍처 및 UEC 전송 규격",
            content: `
              <h3>Ultra Ethernet Consortium (UEC)의 태동</h3>
              <p>독점적이고 매우 고가인 InfiniBand 솔루션에 대응하기 위해 AMD, Intel, Meta, Microsoft, Broadcom 등 업계 거인들이 연합하여 출범시킨 단체가 **UEC**입니다. 기존 이더넷 프레임을 현대 대규모 AI 워크로드(분산 병렬 학습 등)에 극적으로 최적화하는 것을 목표로 삼고 있습니다.</p>

              <div class="info-box">
                <h4>UEC의 차별화된 핵심 해결 방안</h4>
                <ul>
                  <li><strong>새로운 UEP (Ultra Ethernet Protocol):</strong> 기존 TCP/IP의 무거운 헤더 규격을 경량화하고, 패킷 정렬 순서를 강제하지 않는 Out-of-Order 전송을 수용하여, 다중 경로(Multipathing)를 통한 초고속 저지연 처리를 가능케 합니다.</li>
                  <li><strong>적응형 혼잡 제어 (Adaptive Congestion Control):</strong> AI 통신의 고질적 병목인 Incast(여러 단말이 수신자 하나에 동시에 패킷을 쏟아내는 현상) 부하를 스위치 하드웨어가 실시간 감지하여 미세 전송 제어를 수행합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "Ultra Ethernet Specification 1.0 Overview",
                authors: "Ultra Ethernet Consortium",
                venue: "Consortium Specification 2024",
                link: "https://ultraethernet.org",
                note: "대규모 GPU 통신에 이더넷 물리 계층을 고성능 무손실화하기 위한 차세대 UEP 프로토콜 분석"
              }
            ],
            resources: [
              {
                title: "Ultra Ethernet Consortium Official Web",
                link: "https://ultraethernet.org"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "storage",
    title: "Storage System",
    icon: "hard-drive",
    subcategories: [
      {
        id: "gpu_direct",
        title: "GPU Direct Storage",
        items: [
          {
            id: "gds",
            title: "GPUDirect Storage (GDS)",
            summary: "호스트 CPU 및 시스템 RAM을 거치지 않는 데이터 저장 장치와 GPU 메모리 다이렉트 통신",
            content: `
              <h3>GPUDirect Storage (GDS)의 구동 구조</h3>
              <p>GDS는 NVMe SSD 스토리지와 GPU 메모리 간에 CPU 시스템 메모리(호스트 메모리) 경유를 생략하고 PCIe 다이렉트 버스 라우팅으로 데이터를 직접 로딩합니다.</p>
              
              <div class="info-box">
                <h4>GDS 혁신성</h4>
                <p>이 다이렉트 전송(Direct Memory Access) 기법은 대형 LLM 체크포인트 로드나 대용량 학습 이미지를 인피딩할 때 전송 통로 부하를 절반으로 해소하고 속도를 극대화합니다.</p>
              </div>
            `,
            papers: [
              {
                title: "GPUDirect Storage Technical Overview",
                authors: "NVIDIA",
                venue: "NVIDIA Developer Documentation",
                link: "https://docs.nvidia.com/gpudirect-storage/design-guide/index.html",
                note: "SSD 컨트롤러와 GPU HBM 간의 Direct DMA 전송에 관한 심층 아키텍처 명세"
              }
            ],
            resources: [
              {
                title: "GPUDirect Storage Overview - NVIDIA Developer",
                link: "https://developer.nvidia.com/gpudirect-storage"
              }
            ]
          }
        ]
      }
    ]
  }
];
