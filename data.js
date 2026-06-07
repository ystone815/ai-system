// data.js - Knowledge Base Content Database
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

              <h3>주요 학습 인프라 설계 고려사항</h3>
              <p>최근의 LLM 사전 학습 설계는 하드웨어 인프라와 소프트웨어 프레임워크의 극단적인 조율을 필요로 합니다. 기가플롭스(TFLOPS) 당 전력 효율, 랙(Rack) 수준의 방열 구성, 그리고 복잡한 분산 병렬화 기법들이 조화를 이루어야 모델 수렴을 완료할 수 있습니다.</p>
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
              },
              {
                title: "NVIDIA Blog - Scalable LLM Training",
                link: "https://developer.nvidia.com/blog/scaling-large-language-models/"
              }
            ]
          },
          {
            id: "finetuning",
            title: "Fine-tuning & Alignment",
            summary: "지시어 학습(Instruction Tuning) 및 인간 피드백 기반 정렬(RLHF) 기법",
            content: `
              <h3>미세 조정 및 인간 가치 정렬 (Alignment)</h3>
              <p>사전 학습된 베이스 모델을 특정 작업이나 대화형 에이전트로 동작하게 만들기 위한 과정입니다. 전체 가중치를 업데이트하는 Full Fine-tuning 외에, 자원의 한계를 극복하기 위해 파라미터 효율적 미세조정(PEFT) 기법이 많이 활용됩니다.</p>
              
              <div class="info-box">
                <h4>주요 미세조정 및 정렬 기법</h4>
                <ol>
                  <li><strong>LoRA (Low-Rank Adaptation):</strong> 기존 가중치를 고정하고 가중치 행렬의 변화량(\\( \Delta W \\))을 두 개의 저차원 행렬(Low-rank matrices) $A$와 $B$로 분해하여 파라미터 수와 메모리 사용량을 대폭 절감합니다.</li>
                  <li><strong>QLoRA (Quantized LoRA):</strong> 사전 학습 가중치를 4비트 NormalFloat(NF4) 형식으로 양자화하여 미세 조정에 필요한 메모리를 수 분의 일로 줄이면서도 성능을 유지합니다.</li>
                  <li><strong>RLHF (Reinforcement Learning from Human Feedback):</strong> 보상 모델(Reward Model)을 구축하고 PPO(Proximal Policy Optimization) 알고리즘을 사용해 인간 선호도에 맞춰 모델을 조율합니다.</li>
                  <li><strong>DPO (Direct Preference Optimization):</strong> 복잡한 강화 학습(RL) 과정 없이 선호 데이터셋에 직접 크로스 엔트로피 유사 손실 함수를 적용하여 빠르고 안정적인 정렬을 달성합니다.</li>
                </ol>
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
            title: "Inference & Serving (추론 서비스)",
            summary: "대형 모델의 실시간 서빙 및 높은 처리량을 위한 아키텍처 최적화",
            content: `
              <h3>대규모 언어 모델 서빙 시스템의 핵심 과제</h3>
              <p>LLM 추론은 자동회귀적(Autoregressive) 생성 모델 특성상 입력 토큰 크기에 비례하는 <strong>KV Cache(Key-Value Cache)</strong>의 저장이 필수적입니다. 이는 엄청난 양의 GPU 메모리를 차지하며, 유휴 메모리 단편화로 인해 실제 처리량(Throughput)을 제한하는 가장 큰 요인입니다.</p>

              <div class="info-box">
                <h4>서빙 성능 극대화 솔루션</h4>
                <ul>
                  <li><strong>PagedAttention:</strong> 운영체제의 가상 메모리 페이징 기법에서 착안하여, KV Cache를 불연속적인 메모리 공간인 물리 블록으로 나누어 저장함으로써 메모리 낭비(단편화)를 거의 0%에 가깝게 해결합니다. (vLLM의 핵심 기술)</li>
                  <li><strong>Continuous Batching (지속적 배칭):</strong> 요청별 완료 시점이 서로 다른 트래픽 특성을 처리하기 위해 토큰 수준에서 요청을 유동적으로 배치화(Batch)하여 GPU 연산 유휴 시간을 최소화합니다.</li>
                  <li><strong>Speculative Decoding (투기적 디코딩):</strong> 작고 빠른 드래프트(Draft) 모델이 미리 여러 토큰을 초안으로 생성하고, 큰 타겟(Target) 모델이 이를 병렬 검증함으로써 추론 속도를 대폭 끌어올립니다.</li>
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
              }
            ],
            resources: [
              {
                title: "vLLM GitHub project",
                link: "https://github.com/vllm-project/vllm"
              },
              {
                title: "NVIDIA TensorRT-LLM",
                link: "https://github.com/NVIDIA/TensorRT-LLM"
              }
            ]
          }
        ]
      },
      {
        id: "distributed_training",
        title: "Distributed Training (분산 학습)",
        items: [
          {
            id: "parallelism",
            title: "3D Parallelism (3차원 병렬화)",
            summary: "모델 스케일 한계를 깨기 위한 DP, TP, PP 병렬화 조합",
            content: `
              <h3>3차원 병렬 학습 구조 (3D Parallelism)</h3>
              <p>일반적으로 단일 GPU 메모리 용량을 초과하는 매개변수를 가진 대형 모델을 학습하기 위해 Data Parallelism(DP), Tensor Parallelism(TP), Pipeline Parallelism(PP)을 혼합하여 클러스터를 설계합니다.</p>
              
              <div class="info-box">
                <h4>3차원 분산 병렬 기법 개요</h4>
                <ol>
                  <li><strong>데이터 병렬화 (Data Parallelism - DP):</strong> 학습 데이터를 분할하여 여러 디바이스에 공급하고 각자 로컬 그래디언트를 계산한 후 전체 통신(All-Reduce)을 통해 동기화합니다. FSDP(Fully Sharded Data Parallel) 기법이 많이 활용됩니다.</li>
                  <li><strong>텐서 병렬화 (Tensor Parallelism - TP):</strong> 단일 트랜스포머 레이어 내의 행렬 연산(예: Attention Projection, MLP)을 여러 GPU가 분할하여 실행합니다. GPU 장비 간 초고속 내부 대역폭(NVLink 등)이 수반되어야 효율이 납니다. (ex. Megatron-LM 방식)</li>
                  <li><strong>파이프라인 병렬화 (Pipeline Parallelism - PP):</strong> 신경망 레이어들을 그룹화하여 서로 다른 머신에 분산하고 실행 흐름을 파이프라인 스테이지 형태로 관리합니다. 마이크로배치(Micro-batch) 스케줄링 기법(1F1B)을 통해 메모리 및 계산 유휴 시간(Bubble)을 극소화합니다.</li>
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
              },
              {
                title: "GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism",
                authors: "Huang et al.",
                venue: "NeurIPS 2019",
                link: "https://arxiv.org/abs/1811.06965",
                note: "모델 레이어를 순차적으로 쪼개 학습하는 파이프라인 병렬 아키텍처 제안"
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
            title: "ZeRO (Zero Redundancy Optimizer)",
            summary: "데이터 병렬 학습 시 중복 가중치, 옵티마이저 상태 분할로 메모리 절감",
            content: `
              <h3>ZeRO (Zero Redundancy Optimizer) 원리</h3>
              <p>기반 분산 학습(DP) 구조에서는 가중치(Parameters), 그래디언트(Gradients), 옵티마이저 상태(Optimizer States - ex. Adam의 모멘텀 및 분산)가 각 GPU에 중복되어 존재합니다. ZeRO는 이러한 중복성을 제거하여 메모리 효율을 극대화합니다.</p>
              
              <div class="info-box">
                <h4>ZeRO의 3가지 단계 (Stages)</h4>
                <ul>
                  <li><strong>ZeRO-1 (Optimizer State Partitioning):</strong> Adam 옵티마이저의 상태(기존 메모리의 최대 75% 점유)를 데이터 병렬 그룹 내의 GPU들에 골고루 파티셔닝합니다.</li>
                  <li><strong>ZeRO-2 (Gradient Partitioning):</strong> 역전파 과정에서 산출되는 그래디언트까지 결합하여 파티셔닝함으로써 더 넓은 메모리를 보장합니다.</li>
                  <li><strong>ZeRO-3 (Parameter Partitioning):</strong> 순전파 및 역전파 계산 과정에 필요한 순간에만 네트워크 통신을 통해 레이어의 가중치를 가져오고(All-Gather), 연산이 끝나면 가중치를 즉각 폐기(Reduce-Scatter)하는 방식으로 가중치 전체를 분할 보관합니다.</li>
                  <li><strong>ZeRO-Offload / ZeRO-Infinity:</strong> 부족한 GPU 메모리를 CPU RAM 혹은 NVMe SSD 스토리지까지 확장하여 임시 데이터를 오프로드 처리합니다.</li>
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
            summary: "NVIDIA Hopper/Blackwell 가속기 아키텍처 및 텐서 코어(Tensor Cores) 구동 원리",
            content: `
              <h3>현대 AI GPU 아키텍처</h3>
              <p>현대 딥러닝 학습용 GPU(NVIDIA H100, B200 등)는 단순 다중 코어 그래픽 카드를 넘어 거대한 AI 행렬 연산 처리 전용의 매니코어 코프로세서입니다. 코어는 연산을 전담하는 SM(Streaming Multiprocessor) 단위로 설계되어 있습니다.</p>
              
              <div class="info-box">
                <h4>핵심 하드웨어 컴포넌트</h4>
                <ul>
                  <li><strong>Tensor Cores:</strong> 딥러닝의 핵심인 대량의 행렬 곱셈 누적(GEMM: \\( D = A \\times B + C \\)) 연산을 단일 클럭 사이클 수준에서 가속하는 전용 하드웨어 유닛입니다. FP16, BF16을 시작으로 최신 아키텍처에서는 FP8, FP4 데이터 포맷까지 가속합니다.</li>
                  <li><strong>Transformer Engine:</strong> 모델 각 레이어별 동적 값 범위를 실시간 추적하여 연산 정확도 손실을 방지하고, 필요한 때에 적응형으로 FP8과 FP16 포맷을 변환하여 연산 유량을 극대화합니다.</li>
                  <li><strong>SRAM / L2 Cache:</strong> SM 내부에 배치된 Shared Memory/Register File은 연산 성능을 뒷받침하는 핵심 장치로, 레지스터 전송 대역폭은 메모리 외부 대역폭보다 수십 배 빠릅니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "NVIDIA Hopper Architecture Whitepaper",
                authors: "NVIDIA Corporation",
                venue: "Technical Report 2022",
                link: "https://resources.nvidia.com/en-us-tensor-core/gtc22-whitepaper-hopper",
                note: "H100 GPU 아키텍처의 혁신 요소(DPX 명령어, Transformer Engine, HBM3) 설명"
              }
            ],
            resources: [
              {
                title: "NVIDIA Developer Center",
                link: "https://developer.nvidia.com"
              }
            ]
          },
          {
            id: "tpu_npu",
            title: "TPU & NPU Architecture",
            summary: "Google TPU 및 모바일/서버 NPU에서의 Systolic Array 연산 개념",
            content: `
              <h3>Systolic Array와 NPU 설계</h3>
              <p>GPU는 여전히 범용 목적(General Purpose) 연산 능력을 보존하고 있어 제어 로직과 대규모 레지스터가 필요합니다. 반면 구글의 TPU 및 많은 서버용 NPU는 AI 전용 ASIC(Application-Specific Integrated Circuit)으로, 대규모 행렬 곱셈 가속을 극대화하기 위해 <strong>시스톨릭 어레이(Systolic Array)</strong> 데이터 흐름 구조를 적용합니다.</p>

              <div class="info-box">
                <h4>시스톨릭 어레이(Systolic Array)의 특징</h4>
                <p>연산 장치(Processing Elements - PE)가 격자망 구조로 조밀하게 연결되어 있어, 하나의 연산 결과를 외부 메모리(DRAM)에 매번 읽고 쓰는 대신 이웃 PE로 바로 전달하여 파이프라인화합니다. 이는 레지스터 접근 대역폭 소모를 격감시켜 에너지 및 면적 효율을 비약적으로 끌어올립니다.</p>
              </div>
            `,
            papers: [
              {
                title: "In-Datacenter Performance Analysis of a Tensor Processing Unit",
                authors: "Jouppi et al.",
                venue: "ISCA 2017",
                link: "https://arxiv.org/abs/1704.04760",
                note: "구글 1세대 TPU 아키텍처의 역사적 하드웨어 분석 및 설계 방향 제시"
              }
            ],
            resources: [
              {
                title: "Google Cloud TPU Documentation",
                link: "https://cloud.google.com/tpu"
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
              <p>CUDA(Compute Unified Device Architecture)는 C/C++ 기반으로 GPU에서 병렬 실행될 함수(Kernel)를 정의합니다. 수만 개 스레드의 논리적 구도를 계층적으로 관리합니다.</p>
              
              <div class="info-box">
                <h4>스레드 조직 계층 (Thread Hierarchy)</h4>
                <ul>
                  <li><strong>Thread Block:</strong> 동시에 실행될 스레드들의 묶음으로, 하나의 SM에 할당되어 하드웨어 자원을 공유하고 동기화할 수 있습니다. 1개 블록은 최대 1024개 스레드를 가질 수 있습니다.</li>
                  <li><strong>Grid:</strong> 스레드 블록들의 배열입니다. 커널을 런칭할 때 크기를 지정합니다.</li>
                  <li><strong>Warp (워프):</strong> 실제 하드웨어가 실행하는 최소 스레드 배치(32개 스레드)입니다. 32개 스레드가 단일 명령어를 동시 실행하는 SIMT(Single Instruction, Multiple Threads) 방식을 준수합니다.</li>
                </ul>
              </div>

              <h3>메모리 계층과 최적화</h3>
              <p>레지스터(Register) > 공유 메모리(Shared Memory) > 전역 메모리(Global Memory) 순으로 하드웨어 접근 지연시간이 늘어납니다. 따라서 전역 메모리 읽기를 여러 스레드가 동시에 결합 요청하는 Coalesced Access 기법과 공유 메모리를 활용한 타일링(Tiling) 기법이 CUDA 가속의 핵심입니다.</p>
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
              <p>기존 CUDA 프로그래밍은 뛰어난 성능을 보장하지만 C++ 기반 개발 난이도가 높고 최적의 레이아웃 튜닝이 매우 고단합니다. OpenAI Triton은 파이썬 코드를 컴파일하여 최적의 CUDA 커널을 직접 빌드해주는 DSL(Domain-Specific Language)입니다.</p>
              
              <div class="info-box">
                <h4>Triton의 핵심 가치</h4>
                <ul>
                  <li>스레드 병렬성, 블록 메모리 로딩, 동기화(Barrier) 등 복잡한 CUDA 세부 구현을 컴파일러가 자동 최적화합니다.</li>
                  <li>개발자는 복수 개의 원소 연산 대신 블록-수준 연산(Block-level operations)을 정의하는 파이썬 고수준 API에 집중할 수 있습니다.</li>
                  <li>PyTorch Core 아키텍처(ex. PyTorch 2.0 Inductor)의 기본 백엔드로 채택되어 모델 실행 속도를 가속합니다.</li>
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
        title: "High-Bandwidth Memory",
        items: [
          {
            id: "hbm_architecture",
            title: "HBM (High-Bandwidth Memory)",
            summary: "실리콘 관통 전극(TSV) 기술 기반 초고대역폭 적층 메모리 기술 구조 및 흐름",
            content: `
              <h3>HBM(고대역폭 메모리) 기술 원리</h3>
              <p>AI 모델의 학습 속도가 하드웨어 연산 능력보다 데이터 전송 대역폭(Memory Bandwidth)의 제약을 많이 받는 **메모리 벽(Memory Wall)** 현상에 직면하면서 HBM이 현대 GPU 패키지의 표준으로 자리 잡았습니다.</p>
              
              <div class="info-box">
                <h4>HBM 설계적 강점</h4>
                <ul>
                  <li><strong>DRAM 적층 구조:</strong> 여러 개의 메모리 다이(Die)를 수직으로 쌓아 올린 후, <strong>TSV(Through-Silicon Via, 실리콘 관통 전극)</strong> 배선 통로로 전기적으로 연결합니다.</li>
                  <li><strong>실리콘 인터포저:</strong> GPU 로직 다이와 HBM 적층 스택을 패키지 기판 위에 초미세 회로 선폭을 지원하는 인터포저(Interposer)를 사용하여 수평으로 나란히 배치합니다. (2.5D 패키징 기술인 TSMC CoWoS 등)</li>
                  <li><strong>초광대역 인터페이스:</strong> 일반 DDR5 버스 폭(64비트)에 비해 HBM은 단일 스택 기준 1024비트 이상의 매우 넓은 데이터 버스 통로를 제공하므로, 수 TB/s 수준의 전송 효율을 달성합니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "High-Bandwidth Memory (HBM) JEDEC Standard",
                authors: "JEDEC Association",
                venue: "Industry Standard",
                link: "https://www.jedec.org/standards-documents/docs/jesd235",
                note: "HBM의 물리 인터페이스와 제어 신호 방식에 대한 업계 공식 표준 문서"
              }
            ],
            resources: [
              {
                title: "SK hynix HBM Tech Blog",
                link: "https://news.skhynix.co.kr/tag/HBM"
              }
            ]
          },
          {
            id: "unified_memory",
            title: "Unified Memory Architecture",
            summary: "CPU 호스트 메모리와 GPU 로컬 메모리를 가상 주소 공간으로 묶는 아키텍처",
            content: `
              <h3>통합 메모리 아키텍처 (Unified Memory)</h3>
              <p>과거에는 CPU 호스트 메모리의 데이터를 GPU로 전송할 때 개발자가 수동으로 <code>cudaMemcpy</code> 함수를 사용해 복제본을 주고받아야 했습니다. 이 복잡성과 실수를 낮추기 위해 통합 가상 메모리 주소(Unified Memory Architecture) 기술이 도입되었습니다.</p>
              
              <div class="info-box">
                <h4>동작 기작 및 이점</h4>
                <p>CPU와 GPU가 동일한 가상 메모리 포인터(Pointer) 공간을 공유합니다. 가동 중에 GPU가 아직 적재되지 않은 메모리 페이지에 액세스하면 하드웨어 수준의 <strong>Page Fault</strong>가 야기되고, PCIe 통로 혹은 고속 NVLink 링크를 통해 무대 뒤에서 해당 페이지를 로컬 GPU 물리 메모리로 실시간 마이그레이션(Page Migration) 처리합니다. 코딩 편의성이 비약적으로 증가하고 GPU 한계를 초과하는 모델 학습(OOM 방지)을 지원합니다.</p>
              </div>
            `,
            papers: [
              {
                title: "Unified Memory in CUDA",
                authors: "NVIDIA Developer Team",
                venue: "Technical Guide",
                link: "https://developer.nvidia.com/blog/unified-memory-cuda-beginners/",
                note: "통합 메모리의 기초 개념과 동작 및 성능 영향에 관한 프로그래머 가이드"
              }
            ],
            resources: [
              {
                title: "NVIDIA unified memory docs",
                link: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#um-unified-memory-programming-cl"
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
              <h3>NVLink와 NVSwitch의 결합</h3>
              <p>PCIe 슬롯을 통한 GPU 간 데이터 교환 성능(수십 GB/s)은 텐서 병렬 학습 시 엄청난 병목을 유발합니다. NVIDIA는 이를 우회하고자 고유의 점대점(Point-to-Point) 초고속 상호접속 링크인 **NVLink**를 탑재하였습니다.</p>
              
              <div class="info-box">
                <h4>핵심 통신 장비 원리</h4>
                <ul>
                  <li><strong>NVLink:</strong> 메인보드의 PCIe 전송망 대신, 다이렉트 고대역폭 하드웨어 연결을 제공합니다. 칩셋 버전에 따라 양방향 수백 GB/s에서 TB/s 영역의 대역폭을 소유합니다.</li>
                  <li><strong>NVSwitch:</strong> 다수의 GPU가 얽힐 때 격자형 케이블 배선이 난해해지는 것을 해결하는 물리 칩셋입니다. 모든 GPU가 단일 NVSwitch 패브릭을 공유하여 스파이더 형상으로 완전 대칭형 All-to-All 직접 통신이 가능하게 도와줍니다.</li>
                </ul>
              </div>
            `,
            papers: [
              {
                title: "NVIDIA DGX H100 System Architecture",
                authors: "NVIDIA Developer Support",
                venue: "System Whitepaper 2023",
                link: "https://resources.nvidia.com/en-us-dgx-systems/dgx-h100-system-architecture-wp",
                note: "8개 Hopper GPU가 NVSwitch를 타고 메모리를 공유해 단일 가상 GPU처럼 동작하는 패브릭 연결 디테일"
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
              <p>서버 여러 대를 연결해 성능을 극대화하려면 전통적인 TCP/IP 기반 이더넷(Ethernet) 프로토콜은 커널 영역 오버헤드와 CPU 연산 소모가 너무 큽니다. 이에 대응하여 GPU가 호스트 OS 커널 간섭 없이 다른 컴퓨터의 메모리 주소 영역에 직접 접촉하는 <strong>RDMA (Remote Direct Memory Access)</strong> 네트워킹 기술이 절대적 지위를 가집니다.</p>
              
              <div class="info-box">
                <h4>RDMA 실현 2대 산맥</h4>
                <ul>
                  <li><strong>InfiniBand (인피니밴드):</strong> 최고 속도와 최저 지연시간을 구현하는 네트워크 아키텍처로, 하드웨어 전반에 흐름 제어가 기본 내장되어 무손실(Lossless) 데이터 보장을 약속합니다. NVIDIA Quantum 등 초고가 고성능 솔루션에 포진해 있습니다.</li>
                  <li><strong>RoCE (RDMA over Converged Ethernet):</strong> 기존의 표준 이더넷 망 위에서 UDP/IP 헤더를 결합하여 RDMA를 실현하는 기술입니다. 인프라 설치 비용이 저렴하나 PFC(Priority Flow Control) 등을 통해 스위치 수준에서 정교하게 무손실망을 기획해야 전송 손실로 인한 성능 저하를 방지할 수 있습니다.</li>
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
              <p>기존 스토리지 스택에서는 NVMe SSD의 원본 데이터를 읽을 때, 우선 호스트 CPU 제어하에 시스템 페이지 캐시(DRAM)로 버퍼링한 뒤 이를 다시 PCIe 버스를 거쳐 GPU 바운드 버퍼 메모리로 재복사합니다. 이 과정은 귀중한 CPU 코어를 점유하며 PCIe 통로에서 전송 지연을 발생시킵니다.</p>
              
              <div class="info-box">
                <h4>GDS 혁신성</h4>
                <p>NVMe SSD 스토리지와 GPU 메모리 간에 CPU 시스템 메모리(호스트 메모리) 경유를 생략하고 PCIe 다이렉트 버스 라우팅으로 바이트를 직접 로딩합니다. 이 다이렉트 전송(Direct Memory Access) 기법은 대형 LLM 체크포인트 로드나 대용량 학습 이미지를 인피딩(In-feeding)할 때 전송 통로 부하를 절반으로 해소하고 속도를 극대화합니다.</p>
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
