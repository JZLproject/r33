const CONFIG = {
    name: "Medina Ayu Prameswari",
    nickname: "my sweaties rollade",
    birthday: "26 November 2026",
    password: "12102x2087",
    canvaUrl: "PASTE_CANVA_LINK_HERE"
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nickname-text").forEach(el => {
        el.textContent = CONFIG.nickname;
    });

    // Floating Hearts
    const heartsContainer = document.getElementById("hearts-container");
    const heartSymbols = ["💗", "💖", "🤍", "❤️"];

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 12 + 12) + "px";
        heart.style.animationDuration = (Math.random() * 4 + 6) + "s";
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }
    setInterval(createHeart, 900);

    // Audio Controller
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle");
    let isPlaying = false;

    function playMusic() {
        bgMusic.volume = 0.4;
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.remove("hidden");
            musicBtn.classList.add("playing");
        }).catch(() => {
            musicBtn.classList.remove("hidden");
        });
    }

    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove("playing");
            isPlaying = false;
        } else {
            bgMusic.play();
            musicBtn.classList.add("playing");
            isPlaying = true;
        }
    });

    const stageOpening = document.getElementById("stage-opening");
    const stageGift = document.getElementById("stage-gift");
    const stageJourney = document.getElementById("stage-journey");
    const stagePassword = document.getElementById("stage-password");

    document.getElementById("btn-open-gift").addEventListener("click", () => {
        playMusic();
        stageOpening.style.opacity = "0";
        setTimeout(() => {
            stageOpening.classList.add("hidden");
            stageGift.classList.remove("hidden");
            init3DBox();
        }, 500);
    });

    // ==========================================
    // 3D GIFT BOX BESAR & DETAIL ISI DI DALAMNYA
    // ==========================================
    let giftScene, giftCamera, giftRenderer, giftLidGroup, contentsGroup;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let boxOpened = false;

    function init3DBox() {
        const container = document.getElementById("canvas-gift-container");
        if (!container || giftRenderer) return;

        giftScene = new THREE.Scene();
        giftCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        // Posisi kamera agak tinggi agar POV atas terlihat jelas
        giftCamera.position.set(0, 4.8, 7.2);
        giftCamera.lookAt(0, 0.3, 0);

        giftRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        giftRenderer.setSize(container.clientWidth, container.clientHeight);
        giftRenderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(giftRenderer.domElement);

        giftScene.add(new THREE.AmbientLight(0xffffff, 0.95));
        const pLight = new THREE.PointLight(0xffffff, 1.4);
        pLight.position.set(6, 12, 8);
        giftScene.add(pLight);

        const boxGroup = new THREE.Group();
        giftScene.add(boxGroup);

        // Badan Kotak Kado Lebih Besar (3.2 x 2.2 x 3.2)
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0xe63956, roughness: 0.3 });
        const boxBody = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 3.2), bodyMat);
        boxGroup.add(boxBody);

        // Pita Putih pada Badan Kotak
        const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
        boxGroup.add(new THREE.Mesh(new THREE.BoxGeometry(3.24, 2.22, 0.5), ribbonMat));
        boxGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.22, 3.24), ribbonMat));

        // Tutup Kotak (Lid + Pita Tutup)
        giftLidGroup = new THREE.Group();
        giftLidGroup.position.y = 1.3;
        boxGroup.add(giftLidGroup);

        const lidMat = new THREE.MeshStandardMaterial({ color: 0xd9829b, roughness: 0.3 });
        const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(3.35, 0.45, 3.35), lidMat);
        giftLidGroup.add(lidMesh);
        giftLidGroup.add(new THREE.Mesh(new THREE.BoxGeometry(3.38, 0.47, 0.5), ribbonMat));
        giftLidGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.47, 3.38), ribbonMat));

        // GRUP ISI KADO BESAR (Hacipupu Pink, Matcha, Cokelat)
        contentsGroup = new THREE.Group();
        contentsGroup.position.set(0, 0.2, 0);
        contentsGroup.visible = false;
        boxGroup.add(contentsGroup);

        // 1. Boneka Hacipupu Pink (Badan, Kepala, & Telinga Lucu)
        const haciGroup = new THREE.Group();
        haciGroup.position.set(-0.85, 0.3, 0.1);
        const pinkMat = new THREE.MeshStandardMaterial({ color: 0xff9ebb, roughness: 0.35 });
        const faceMat = new THREE.MeshStandardMaterial({ color: 0xffe5ec, roughness: 0.35 });

        const haciBody = new THREE.Mesh(new THREE.SphereGeometry(0.48, 20, 20), pinkMat);
        const haciHead = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 20), faceMat);
        haciHead.position.y = 0.62;
        const earLeft = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.35, 16), pinkMat);
        earLeft.position.set(-0.22, 0.98, 0);
        earLeft.rotation.z = 0.3;
        const earRight = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.35, 16), pinkMat);
        earRight.position.set(0.22, 0.98, 0);
        earRight.rotation.z = -0.3;

        haciGroup.add(haciBody, haciHead, earLeft, earRight);
        contentsGroup.add(haciGroup);

        // 2. Minuman Matcha Besar (Gelas Hijau + Tutup Cream + Sedotan)
        const matchaGroup = new THREE.Group();
        matchaGroup.position.set(0.85, 0.35, -0.1);
        const cupMat = new THREE.MeshStandardMaterial({ color: 0x74c69d, roughness: 0.25 });
        const foamMat = new THREE.MeshStandardMaterial({ color: 0xf8f9fa, roughness: 0.4 });
        const strawMat = new THREE.MeshStandardMaterial({ color: 0x2d6a4f });

        const matchaCup = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.26, 0.95, 24), cupMat);
        const matchaFoam = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.15, 24), foamMat);
        matchaFoam.position.y = 0.48;
        const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 12), strawMat);
        straw.position.set(0.08, 0.72, 0);
        straw.rotation.z = -0.25;

        matchaGroup.add(matchaCup, matchaFoam, straw);
        contentsGroup.add(matchaGroup);

        // 3. Cokelat Batangan Besar (Base Cokelat + Bungkus Merah/Emas)
        const chocoGroup = new THREE.Group();
        chocoGroup.position.set(0, 0.2, 0.85);
        chocoGroup.rotation.x = 0.25;
        const chocoMat = new THREE.MeshStandardMaterial({ color: 0x4a2511, roughness: 0.4 });
        const wrapMat = new THREE.MeshStandardMaterial({ color: 0xe63956, roughness: 0.3 });

        const chocoBar = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.22, 0.65), chocoMat);
        const chocoWrap = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.24, 0.67), wrapMat);
        chocoWrap.position.x = 0.15;

        chocoGroup.add(chocoBar, chocoWrap);
        contentsGroup.add(chocoGroup);

        // Kontrol Rotasi 360 Derajat (Atas, Bawah, Kanan, Kiri)
        container.addEventListener("pointerdown", (e) => {
            isDragging = true;
            prevMouse = { x: e.clientX, y: e.clientY };
        });
        window.addEventListener("pointermove", (e) => {
            if (!isDragging) return;
            boxGroup.rotation.y += (e.clientX - prevMouse.x) * 0.012;
            boxGroup.rotation.x += (e.clientY - prevMouse.y) * 0.012;
            prevMouse = { x: e.clientX, y: e.clientY };
        });
        window.addEventListener("pointerup", () => isDragging = false);

        // Klik untuk Membuka Kotak (Tutup Terangkat & Isi Muncul Jelas di Atas)
        container.addEventListener("click", () => {
            if (boxOpened) return;
            boxOpened = true;

            let progress = 0;
            const openInterval = setInterval(() => {
                progress += 0.05;
                // Tutup terangkat ke belakang atas
                giftLidGroup.position.y += 0.16;
                giftLidGroup.position.z -= 0.12;
                giftLidGroup.rotation.x -= 0.14;

                // Isi kado naik keluar dari kotak
                contentsGroup.visible = true;
                if (contentsGroup.position.y < 1.45) {
                    contentsGroup.position.y += 0.08;
                }

                if (progress >= 1) clearInterval(openInterval);
            }, 30);

            confetti({
                particleCount: 120,
                spread: 85,
                origin: { y: 0.6 },
                colors: ["#ff758c", "#ff7eb3", "#ffffff", "#74c69d"]
            });

            document.getElementById("gift-hint").classList.add("hidden");
            document.getElementById("gift-reveal-text").classList.remove("hidden");

            // Jeda 3.2 detik agar Medina sempat melihat & memutar isi kadonya sebelum lanjut
            setTimeout(() => {
                stageGift.style.opacity = "0";
                setTimeout(() => {
                    stageGift.classList.add("hidden");
                    stageJourney.classList.remove("hidden");
                    window.scrollTo(0, 0);
                    triggerScrollReveal();
                }, 600);
            }, 3200);
        });

        function animate() {
            requestAnimationFrame(animate);
            if (!isDragging && !boxOpened) {
                boxGroup.rotation.y += 0.006;
            }
            giftRenderer.render(giftScene, giftCamera);
        }
        animate();
    }

    // ==========================================
    // 3D ROTATABLE LOVE LETTER
    // ==========================================
    let envScene, envCamera, envRenderer;
    let envDragging = false;
    let envPrevMouse = { x: 0, y: 0 };
    let envelopeOpened = false;

    function init3DEnvelope() {
        const container = document.getElementById("canvas-envelope-container");
        if (!container || envRenderer) return;

        envScene = new THREE.Scene();
        envCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        envCamera.position.set(0, 0, 5);

        envRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        envRenderer.setSize(container.clientWidth, container.clientHeight);
        envRenderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(envRenderer.domElement);

        envScene.add(new THREE.AmbientLight(0xffffff, 0.9));
        const light = new THREE.PointLight(0xffffff, 1.2);
        light.position.set(2, 3, 4);
        envScene.add(light);

        const envGroup = new THREE.Group();
        envScene.add(envGroup);

        const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf8ad9d, roughness: 0.4 });
        const envelopeBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.5, 0.08), bodyMat);
        envGroup.add(envelopeBody);

        const flapShape = new THREE.Shape();
        flapShape.moveTo(-1.2, 0);
        flapShape.lineTo(1.2, 0);
        flapShape.lineTo(0, -0.8);
        flapShape.closePath();

        const extrudeSettings = { depth: 0.04, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
        const flapGeo = new THREE.ExtrudeGeometry(flapShape, extrudeSettings);
        const flapMat = new THREE.MeshStandardMaterial({ color: 0xf4978e, roughness: 0.4 });
        const flapMesh = new THREE.Mesh(flapGeo, flapMat);
        flapMesh.position.set(0, 0.75, 0.04);
        envGroup.add(flapMesh);

        const heartMat = new THREE.MeshStandardMaterial({ color: 0xe63956 });
        const heartMesh = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.12), heartMat);
        heartMesh.position.set(0, -0.1, 0.06);
        envGroup.add(heartMesh);

        container.addEventListener("pointerdown", (e) => {
            envDragging = true;
            envPrevMouse = { x: e.clientX, y: e.clientY };
        });
        window.addEventListener("pointermove", (e) => {
            if (!envDragging) return;
            envGroup.rotation.y += (e.clientX - envPrevMouse.x) * 0.01;
            envGroup.rotation.x += (e.clientY - envPrevMouse.y) * 0.01;
            envPrevMouse = { x: e.clientX, y: e.clientY };
        });
        window.addEventListener("pointerup", () => envDragging = false);

        container.addEventListener("click", () => {
            if (envelopeOpened) return;
            openLoveLetter();
        });

        function animateEnv() {
            requestAnimationFrame(animateEnv);
            if (!envDragging && !envelopeOpened) envGroup.rotation.y += 0.007;
            envRenderer.render(envScene, envCamera);
        }
        animateEnv();
    }

    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const letterPaper = document.getElementById("letter-paper");
    const btnOpenLetter = document.getElementById("btn-open-letter");

    function openLoveLetter() {
        if (envelopeOpened) return;
        envelopeOpened = true;

        envelopeWrapper.style.opacity = "0";
        setTimeout(() => {
            envelopeWrapper.classList.add("hidden");
            letterPaper.classList.remove("hidden");
            const paragraphs = letterPaper.querySelectorAll("p");
            paragraphs.forEach((p, index) => {
                p.style.animationDelay = `${index * 0.25}s`;
            });
        }, 500);
    }

    btnOpenLetter.addEventListener("click", openLoveLetter);

    function triggerScrollReveal() {
        const reveals = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    if (entry.target.querySelector("#canvas-envelope-container") && !envRenderer) {
                        init3DEnvelope();
                    }
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(el => observer.observe(el));
    }

    document.getElementById("btn-to-password").addEventListener("click", () => {
        stageJourney.classList.add("hidden");
        stagePassword.classList.remove("hidden");
        window.scrollTo(0, 0);
    });

    const passwordInput = document.getElementById("password-input");
    const passwordError = document.getElementById("password-error");
    const passwordGate = document.getElementById("password-gate");
    const passwordSuccess = document.getElementById("password-success");
    const redirectState = document.getElementById("redirect-state");

    function checkPassword() {
        const userInput = passwordInput.value.trim();
        if (userInput === CONFIG.password) {
            passwordError.classList.add("hidden");
            passwordGate.classList.add("hidden");
            passwordSuccess.classList.remove("hidden");

            confetti({
                particleCount: 110,
                spread: 80,
                origin: { y: 0.6 }
            });
        } else {
            passwordError.classList.remove("hidden");
            passwordError.style.animation = "none";
            passwordError.offsetHeight;
            passwordError.style.animation = null;
        }
    }

    document.getElementById("btn-unlock").addEventListener("click", checkPassword);
    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") checkPassword();
    });

    document.getElementById("btn-final-canva").addEventListener("click", () => {
        passwordSuccess.classList.add("hidden");
        redirectState.classList.remove("hidden");

        setTimeout(() => {
            if (CONFIG.canvaUrl && CONFIG.canvaUrl !== "PASTE_CANVA_LINK_HERE") {
                window.location.href = CONFIG.canvaUrl;
            } else {
                alert("Link Canva belum diisi di script.js (bagian CONFIG.canvaUrl) 😊");
            }
        }, 2200);
    });
});