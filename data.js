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
                  <li><strong>LoRA (Low-Rank Adaptation):</strong> 기존 가중치를 고정하고 가중치 행렬의 변화량(\\( \Delta W \\))을 두 개의 저차원 행렬로 분해하여 파라미터 수와 메모리 사용량을 대폭 절감합니다.</li>
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
              <h3>대규모 언어 모델 서빙 시스템의 핵심 과제</h3>
              <p>LLM 추론은 자동회귀적(Autoregressive) 생성 모델 특성상 입력 토큰 크기에 비례하는 <strong>KV Cache(Key-Value Cache)</strong>의 저장이 필수적입니다. 이는 엄청난 양의 GPU 메모리를 차지하며, 유휴 메모리 단편화로 인해 실제 처리량을 제한하는 가장 큰 요인입니다.</p>

              <div class="info-box">
                <h4>서빙 성능 극대화 솔루션</h4>
                <ul>
                  <li><strong>PagedAttention:</strong> 운영체제의 가상 메모리 페이징 기법에서 착안하여, KV Cache를 불연속적인 메모리 공간인 물리 블록으로 나누어 저장함으로써 메모리 단편화를 거의 0%에 가깝게 해결합니다. (vLLM의 핵심 기술)</li>
                  <li><strong>Continuous Batching (지속적 배칭):</strong> 요청별 완료 시점이 서로 다른 트래픽 특성을 처리하기 위해 토큰 수준에서 요청을 유동적으로 배치화하여 GPU 연산 유휴 시간을 최소화합니다.</li>
                  <li><strong>Speculative Decoding (투기적 디코딩):</strong> 작고 빠른 드래프트 모델이 미리 여러 토큰을 초안으로 생성하고, 큰 타겟 모델이 이를 병렬 검증함으로써 추론 속도를 대폭 끌어올립니다.</li>
                </ul>
              </div>

              <h4>PagedAttention 가상 메모리 매핑 아키텍처</h4>
              <svg viewBox="0 0 500 180" width="100%" class="svg-diagram">
                <style>
                  .svg-bg { fill: #11131e; rx: 12px; }
                  .v-page { fill: rgba(99, 102, 241, 0.15); stroke: #6366f1; stroke-width: 1.5; rx: 6px; }
                  .p-block { fill: rgba(16, 185, 129, 0.15); stroke: #10b981; stroke-width: 1.5; rx: 6px; }
                  .mapping-arrow { stroke: #a78bfa; stroke-width: 1.5; stroke-dasharray: 2; fill: none; }
                  .marker-arrow { fill: #a78bfa; }
                  .label { font-family: 'Inter', sans-serif; font-size: 10px; fill: #f3f4f6; text-anchor: middle; font-weight: bold; }
                  .title-text { font-family: 'Inter', sans-serif; font-size: 11px; fill: #818cf8; font-weight: bold; }
                </style>
                <rect width="500" height="180" class="svg-bg" />
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 2 L 10 5 L 0 8 z" class="marker-arrow" />
                  </marker>
                </defs>

                <!-- Logical Page -->
                <text x="110" y="25" class="title-text" text-anchor="middle">Logical KV Cache (Pages)</text>
                <rect x="30" y="40" width="160" height="30" class="v-page" />
                <text x="110" y="58" class="label">Logical Page 0 (Tokens 0-15)</text>
                
                <rect x="30" y="85" width="160" height="30" class="v-page" />
                <text x="110" y="103" class="label">Logical Page 1 (Tokens 16-31)</text>

                <!-- Page Table -->
                <rect x="220" y="55" width="50" height="50" fill="#1e293b" stroke="#475569" stroke-width="1.5" rx="4" />
                <text x="245" y="75" class="label" font-size="9px">Page Table</text>
                <text x="245" y="90" class="label" font-size="8px" fill="#9ca3af">0 &rarr; Block 4</text>
                <text x="245" y="98" class="label" font-size="8px" fill="#9ca3af">1 &rarr; Block 9</text>

                <!-- Physical Memory -->
                <text x="390" y="25" class="title-text" text-anchor="middle">Physical HBM (Blocks)</text>
                
                <rect x="310" y="40" width="160" height="30" class="p-block" />
                <text x="390" y="58" class="label">Physical Block 4 (Non-contiguous)</text>
                
                <rect x="310" y="110" width="160" height="30" class="p-block" />
                <text x="390" y="128" class="label">Physical Block 9 (Non-contiguous)</text>

                <!-- Mapping Lines -->
                <path d="M 190 55 L 220 70 M 270 70 L 310 55" class="mapping-arrow" marker-end="url(#arrow)" />
                <path d="M 190 100 L 220 85 M 270 85 L 310 120" class="mapping-arrow" marker-end="url(#arrow)" />
              </svg>
            `,
            papers: [
              {
                title: "Efficient Memory Management for LLM Serving with PagedAttention",
                authors: "Kwon et al.",
                venue: "SOSP 2023",
                link: "https://arxiv.org/abs/2309.06180",
                note: "vLLM 엔진의 핵심 기술로 가상 메모리 페이징 기법을 결합하여 동적 KV 캐시를 최적화"
              }
            ],
            resources: [
              {
                title: "vLLM GitHub project",
                link: "https://github.com/vllm-project/vllm"
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
                  \\( W_{fp16} \approx S \times W_{fp4} \\)
                </p>
                <p>여기서 \\( S \\)는 Outlier(극단치)의 영향을 고르게 분산하여 양자화에 따른 정확도(Accuracy) 저하를 방지합니다.</p>
              </div>

              <h3>11. 초대형 클러스터의 신뢰성 및 장애 방지(RAS) 아키텍처</h3>
              <p>수만 개의 GPU를 묶어 몇 달간 학습을 계속하면 하드웨어 불량이 일상적으로 발생합니다. 이에 대응하기 위해 Blackwell 이상 아키텍처에는 RAS(Reliability, Availability, and Serviceability) 엔진이 기본 장착되어, 온칩 SRAM의 에러를 정정(ECC)하고 실시간 통신 패킷 이상을 수백 마이크로초 이내에 감지해 패킷을 자동 재전송함으로써 학습이 예기치 않게 다운되는 중단 사고를 미연에 방지합니다.</p>

              <h3>12. 하드웨어 가속을 극대화하는 소프트웨어 런타임 (CUDA & Triton)</h3>
              <p>하드웨어 아키텍처가 발전할수록 이를 컴파일링하는 런타임의 역할이 치명적으로 중요해집니다. CUDA 프로그래밍의 Warp Level Primitive 연산(예: __shfl_sync)은 워프 내부 스레드 간 초고속 데이터 셔플을 보장하며, Triton 컴파일러는 블록 연산의 메모리 레이아웃을 내부 중간 언어(IR)로 최적화해 GPU 메모리 컨트롤러가 연속된 어드레스 대역을 하나의 큰 버스트 전송(Coalesced Memory Access)으로 퍼내도록 빌드합니다.</p>

              <h3>13. 랙 스케일 아키텍처: GB200/GR200 NVL72 시스템 설계</h3>
              <p>랙 수준의 통합 컴퓨팅 시스템인 GB200 NVL72는 Grace CPU 36개와 Blackwell GPU 72개를 동축 구리 케이블(Copper Backplane) 백플레인으로 직접 설계했습니다. 구리 케이블 전송 방식은 광 인터커넥트 대비 전송 지연이 극히 짧고 전력 소모량이 거의 제로에 가까워, 72개의 GPU가 단 하나의 거대한 46.8 TB 대역을 갖춘 가상 메모리 단일 풀 GPU 클러스터 도메인으로 매끄럽게 엮이게 만듭니다.</p>

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
