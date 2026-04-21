/**
 * Holy Quran Player - script.js
 * 
 * CORE LOGIC:
 * - Data Fetching (api.alquran.cloud)
 * - Audio Playback (HTML5 Audio API)
 * - State Management (Settings & User Session)
 * - Multi-Language (i18n) Engine (EN/AR with Tashkil)
 */

// --- Translation Dictionary ---
const TRANSLATIONS = {
    en: {
        menu_reciters: "Reciters",
        menu_home: "Home",
        menu_favorites: "Favorites",
        menu_about: "About the App",
        menu_settings: "Settings",
        menu_contact: "Contact",
        app_title: "Holy Quran Player",
        app_subtitle: "Listen to the Noble Quran",
        footer_rights: "Holy Quran Player",
        featured_label: "Featured Reciter",
        hq_badge: "High Quality MP3",
        section_reciters: "Featured Reciters",
        section_surahs: "Surah Playlist",
        search_placeholder: "Search Surah...",
        fetching_surahs: "Fetching Surahs...",
        about_title: "About the App",
        about_desc: "A professional Quran MP3 player that allows listening to high-quality recitations from renowned reciters.",
        feat_surahs: "114 Surahs available",
        feat_controls: "Professional playback controls",
        feat_search: "Instant search and filtering",
        feat_settings: "Persistent settings & preferences",
        spiritual_note: "Listen and reflect on the words of Allah.",
        contact_title: "Contact Us",
        contact_msg: "For suggestions or feedback regarding this Quran application.",
        settings_title: "Settings",
        set_lang: "Language",
        set_autoplay: "Auto-play Next Surah",
        set_remember: "Remember Session",
        set_darkmode: "Dark Mode",
        set_def_reciter: "Default Reciter",
        catalog_title: "Choose Reciter",
        select_surah: "Select a Surah",
        start_listening: "to start listening",
        status_stopped: "Stopped",
        status_playing: "Playing",
        status_paused: "Paused",
        status_error: "Error",
        btn_select: "Select",
        section_favorites: "Favorite Surahs",
        no_favorites: "No favorite surahs yet.",
        no_results: "No surahs found matching your search.",
        retry_btn: "Retry Loading"
    },
    ar: {
        menu_reciters: "القُرَّاءُ",
        menu_home: "الرَّئِيْسِيَّةُ",
        menu_favorites: "المُفَضَّلَةُ",
        menu_about: "عَنِ التَّطْبِيقِ",
        menu_settings: "الإِعْدَادَاتُ",
        menu_contact: "اتَّصِلْ بِنَا",
        app_title: "مُشَغِّلُ القُرْآنِ الكَرِيمِ",
        app_subtitle: "اِسْتَمِعْ إِلَى القُرْآنِ الكَرِيمِ",
        footer_rights: "مُشَغِّلُ القُرْآنِ الكَرِيمِ",
        featured_label: "القَارِئُ المُمَيَّزُ",
        hq_badge: "صَوْتٌ عَالِي الجَوْدَةِ",
        section_reciters: "قُرَّاءٌ مُمَيَّزُونَ",
        section_surahs: "قَائِمَةُ السُّوَرِ",
        search_placeholder: "اِبْحَثْ عَنِ السُّورَةِ...",
        fetching_surahs: "جَارٍ جَلْبُ السُّوَرِ...",
        about_title: "حَوْلَ التَّطْبِيقِ",
        about_desc: "مُشَغِّلٌ اِحْتِرَافِيٌّ لِلْقُرْآنِ الكَرِيمِ يُتِيحُ الِاسْتِمَاعَ إِلَى تِلَاوَاتٍ عَالِيَةِ الجَوْدَةِ مِنْ مَشَاهِيرِ القُرَّاءِ.",
        feat_surahs: "١١٤ سُورَةً مُتَاحَةً",
        feat_controls: "أَدَوَاتُ تَحَكُّمٍ اِحْتِرَافِيَّةٍ",
        feat_search: "بَحْثٌ وَتَصْفِيَةٌ فَوْرِيَّةٌ",
        feat_settings: "إِعْدَادَاتٌ وَتَفْضِيلَاتٌ مُسْتَمِرَّةٌ",
        spiritual_note: "اِسْتَمِعْ وَتَدَبَّرْ كَلَامَ اللهِ عَزَّ وَجَلَّ.",
        contact_title: "اتَّصِلْ بِنَا",
        contact_msg: "لِلِاقْتِرَاحَاتِ أَوِ المُلَاحَظَاتِ بِخُصُوصِ هَذَا التَّطْبِيقِ.",
        settings_title: "الإِعْدَادَاتُ",
        set_lang: "اللُّغَةُ",
        set_autoplay: "التَّشْغِيلُ التِّلْقَائِيُّ",
        set_remember: "تَذَكُّرُ الجَلْسَةِ",
        set_darkmode: "الوَضْعُ اللِّيْلِيُّ",
        set_def_reciter: "القَارِئُ الاِفْتِرَاضِيُّ",
        catalog_title: "اخْتَرِ القَارِئَ",
        select_surah: "اِخْتَرْ سُورَةً",
        start_listening: "لِلْبَدْءِ فِي الِاسْتِمَاعِ",
        status_stopped: "مُتَوَقِّفٌ",
        status_playing: "جَارٍ التَّشْغِيلُ",
        status_paused: "مُتَوَقِّفٌ مُؤَقَّتًا",
        status_error: "خَطَأٌ",
        btn_select: "اِخْتَرْ",
        section_favorites: "السُّوَرُ المُفَضَّلَةُ",
        no_favorites: "لَا تُوجَدُ سُوَرٌ مُفَضَّلَةٌ بَعْدُ.",
        no_results: "لَمْ يَتِمَّ العُثُورُ عَلَى سُوَرٍ مُطَابِقَةٍ لِبَحْثِكَ.",
        retry_btn: "إِعَادَةُ المُحَاوَلَةِ"
    }
};

// --- Data & Configuration ---
const RECITERS = [
    {
        id: 'minsh',
        name: { en: 'Muhammad Siddiq al-Minshawi', ar: 'مُحَمَّدُ صِدِّيق المِنْشَاوِي' },
        subname: 'Murattal',
        country: { en: 'Egypt', ar: 'مِصْرُ' },
        server: 'https://server10.mp3quran.net/minsh/',
        image: 'Images/Al-Minshawi.jpg',
        description: {
            en: 'Renowned for his melodic and emotional Murattal recitation, Al-Minshawi is a pillar of the golden age of Egyptian reciters.',
            ar: 'اِشْتَهَرَ بِتِلَاوَتِهِ المُرَتَّلَةِ العَذْبَةِ وَالمُؤَثِّرَةِ، وَيُعَدُّ رُكْنًا مِنْ أَرْكَانِ مَدْرَسَةِ التِّلَاوَةِ المِصْرِيَّةِ القَدِيمَةِ.'
        }
    },
    {
        id: 'basit',
        name: { en: 'Abdul Basit Abdus Samad', ar: 'عَبْدُ البَاسِطِ عَبْدِ الصَّمَدِ' },
        subname: 'Murattal',
        country: { en: 'Egypt', ar: 'مِصْرُ' },
        server: 'https://server7.mp3quran.net/basit/',
        image: 'Images/abdelbassit-abdessamad.jpg',
        description: {
            en: 'Commonly known as the "Golden Throat," his powerful and breath-taking recitations are celebrated globally.',
            ar: 'يُلَقَّبُ بـ "الحَنْجَرَةِ الذَّهَبِيَّةِ"، حَيْثُ نَالَتْ تِلَاوَاتُهُ القَوِيَّةُ وَالمُذْهِلَةُ شُهْرَةً وَاسِعَةً فِي جَمِيعِ أَنْحَاءِ العَالَمِ.'
        }
    },
    {
        id: 'husr',
        name: { en: 'Mahmoud Khalil Al-Hussary', ar: 'مَحْمُودُ خَلِيل الحُصَرِي' },
        subname: 'Murattal',
        country: { en: 'Egypt', ar: 'مِصْرُ' },
        server: 'https://server13.mp3quran.net/husr/',
        image: 'Images/mahmoud-khalil-al-hussary.jpg',
        description: {
            en: 'A master of Tajweed, his precise and clear articulation makes his recitations a standard for students and listeners alike.',
            ar: 'شَيْخُ عُمُومِ المَقَارِئِ المِصْرِيَّةِ، اِشْتَهَرَ بِدِقَّةِ مَخَارِجِ الحُرُوفِ وَإِتْقَانِ قَوَاعِدِ التَّجْوِيدِ.'
        }
    },
    {
        id: 'souil',
        name: { en: 'Younes Souilass', ar: 'يُونُس اسْوِيلَص' },
        subname: 'Warsh \'an Nafi\'',
        country: { en: 'Morocco', ar: 'المَغْرِبُ' },
        server: 'https://server16.mp3quran.net/souilass/Rewayat-Warsh-A-n-Nafi/',
        image: 'Images/Younes Souilas.jpg',
        description: {
            en: 'A distinguished Moroccan reciter known for his soulful and precise recitation in the Warsh \'an Nafi\' narration.',
            ar: 'مُقْرِئٌ مَغْرِبِيٌّ تَمَيَّزَ بِصَوْتِهِ الخَاشِعِ وَبَرَاعَتِهِ فِي التِّلَاوَةِ بِرِوَايَةِ وَرْشٍ عَنِ نَافِعٍ.'
        }
    }
];

// --- State Management ---
let state = {
    surahs: [],
    favorites: [],
    currentReciter: RECITERS[0],
    currentSurahIndex: -1,
    isPlaying: false,
    settings: {
        isAutoplay: true,
        isDarkMode: false,
        rememberSession: true,
        volume: 0.7,
        defaultReciterId: 'minsh',
        language: 'en'
    }
};

// --- DOM Selectors ---
const audio = document.getElementById('main-audio');
const surahListContainer = document.getElementById('surah-list');
const favoritesSection = document.getElementById('favorites-section');
const favoritesListContainer = document.getElementById('favorites-list');
const appPages = document.querySelectorAll('.app-page');
const logoHomeTrigger = document.getElementById('logo-home-trigger');
const recitersGrid = document.getElementById('reciters-grid');
const surahSearchInput = document.getElementById('surah-search');
const headerSearchWrap = document.getElementById('header-search-wrap');
const searchToggleHeader = document.getElementById('search-toggle-header');
const headerSearchInput = document.getElementById('header-search-input');

// Player UI
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const skipBackBtn = document.getElementById('skip-back-btn');
const skipForwardBtn = document.getElementById('skip-forward-btn');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');
const autoplayToggleQuick = document.getElementById('autoplay-toggle-quick');
const progressBar = document.getElementById('progress-bar');
const progressWrap = document.getElementById('progress-wrap');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Track Info UI
const playingSurahTitle = document.getElementById('playing-surah');
const playingReciterName = document.getElementById('playing-reciter');
const playerReciterImg = document.getElementById('player-reciter-img');
const playerStatus = document.getElementById('player-status');
const playerFavBtn = document.getElementById('player-fav-btn');

// Side Menu & Modals
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const closeMenu = document.getElementById('close-menu');
const overlay = document.getElementById('overlay');
const menuLinks = document.querySelectorAll('.menu-link');
const closeModals = document.querySelectorAll('.close-modal');

// Language Switching
const langToggleHeader = document.getElementById('lang-toggle-header');
const langLabelHeader = document.getElementById('lang-label-header');
const languageSelect = document.getElementById('language-select');

// Settings Inputs
const autoplaySwitch = document.getElementById('autoplay-switch');
const rememberSwitch = document.getElementById('save-position-switch');
const darkModeSwitch = document.getElementById('dark-mode-switch');
const themeToggleHeader = document.getElementById('theme-toggle-header');
const defaultReciterSelect = document.getElementById('default-reciter-select');

/**
 * INITIALIZATION
 * Bootstraps the app by loading settings, fetching data, and rendering UI.
 */
async function init() {
    try {
        loadSettings();
        applyLanguage(state.settings.language);
        await fetchSurahs();
        updateRecitersUI();
        renderSettingsOptions();
        applySettings();
        updatePlayerInfoUI();
    } catch (e) {
        console.error("Initialization failed:", e);
    }
}

// Ensure DOM is ready
document.addEventListener('DOMContentLoaded', init);

/**
 * DATA FETCHING
 * Retrieves surah metadata from the public AlQuran API.
 */
async function fetchSurahs() {
    try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        state.surahs = data.data;
        renderSurahList(state.surahs);
        renderFavoritesList();

        // Handle session resume
        if (state.settings.rememberSession && state.lastSessionIndex !== undefined && state.lastSessionIndex !== -1) {
            setupInitialSession(state.lastSessionIndex);
        }
    } catch (error) {
        console.error('Error fetching surahs:', error);
        if (surahListContainer) {
            const lang = state.settings.language;
            surahListContainer.innerHTML = `
                <div class="error-container">
                    <p class="error">${TRANSLATIONS[lang].status_error}</p>
                    <button class="retry-btn" onclick="fetchSurahs()">${TRANSLATIONS[lang].retry_btn}</button>
                </div>
            `;
        }
    }
}

// --- Multi-Language Logic ---
function applyLanguage(lang) {
    state.settings.language = lang;
    const isAr = lang === 'ar';

    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (TRANSLATIONS[lang][key]) {
            el.placeholder = TRANSLATIONS[lang][key];
        }
    });

    // Update Header Toggle Label
    langLabelHeader.textContent = isAr ? 'EN' : 'AR';
    languageSelect.value = lang;

    // Refresh dynamic lists
    if (state.surahs.length > 0) {
        renderSurahList(state.surahs);
        renderFavoritesList();
    }
    updateRecitersUI();
    updatePlayerInfoUI();
    saveSettings();
}

/**
 * MENU & MODAL HANDLING
 */
function toggleMenu(show) {
    sideMenu.classList.toggle('active', show);
    updateOverlayState();
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        sideMenu.classList.remove('active'); // Close menu without hiding overlay yet
        updateOverlayState();
    }
}

function hideAllModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    sideMenu.classList.remove('active');
    updateOverlayState();
}

function updateOverlayState() {
    const isAnyModalOpen = document.querySelector('.modal.active');
    const isMenuOpen = sideMenu.classList.contains('active');
    overlay.classList.toggle('active', !!(isAnyModalOpen || isMenuOpen));
}

// Event Listeners for UI
menuToggle.addEventListener('click', () => toggleMenu(true));
closeMenu.addEventListener('click', () => toggleMenu(false));
overlay.addEventListener('click', hideAllModals);

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const modalId = e.currentTarget.getAttribute('data-modal');
        const pageId = e.currentTarget.getAttribute('data-page');

        if (modalId) {
            showModal(modalId);
        } else if (pageId) {
            navigateTo(pageId);
        }
    });
});

logoHomeTrigger.addEventListener('click', () => navigateTo('home-page'));

playerFavBtn.addEventListener('click', () => {
    if (state.currentSurahIndex !== -1) {
        const surah = state.surahs[state.currentSurahIndex];
        toggleFavorite(surah.number);
    }
});

function navigateTo(pageId) {
    // Reset search when going home
    if (pageId === 'home-page') {
        resetSearch();
    }

    appPages.forEach(page => {
        page.classList.toggle('active', page.id === pageId);
        // Explicitly handle display for older browsers or safety
        page.style.display = page.id === pageId ? 'block' : 'none';
    });
    toggleMenu(false);

    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetSearch() {
    headerSearchInput.value = '';
    surahSearchInput.value = '';
    if (state.surahs.length > 0) {
        renderSurahList(state.surahs);
    }
}

closeModals.forEach(btn => {
    btn.addEventListener('click', hideAllModals);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideAllModals();
});

langToggleHeader.addEventListener('click', () => {
    const newLang = state.settings.language === 'en' ? 'ar' : 'en';
    applyLanguage(newLang);
});

// Search Logic
searchToggleHeader.addEventListener('click', () => {
    headerSearchWrap.classList.toggle('expanded');
    if (headerSearchWrap.classList.contains('expanded')) {
        headerSearchInput.focus();
    }
});

function normalizeArabic(text) {
    if (!text) return "";
    return text
        .replace(/[\u064B-\u065F]/g, "") // Strip Tashkil
        .replace(/\u0621/g, "\u0627") // Normalize Hamza
        .replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627") // Normalize Alif (including Alif Wasla)
        .replace(/\u0649/g, "\u064A") // Normalize Yaa
        .replace(/\u0629/g, "\u0647"); // Normalize Taa Marbuta
}

function performSearch(query) {
    const q = query.toLowerCase().trim();
    const normalizedQ = normalizeArabic(q);
    
    // Auto-navigate to home if searching from favorites
    if (q.length > 0 && document.getElementById('favorites-page').classList.contains('active')) {
        navigateTo('home-page');
    }
    
    // Sync both inputs if needed (prevent recursive input events or cursor jumps)
    if (headerSearchInput.value !== query) headerSearchInput.value = query;
    if (surahSearchInput.value !== query) surahSearchInput.value = query;
    
    // Auto-scroll to playlist on search
    if (q.length > 0) {
        const playlistHeader = document.querySelector('.surah-header');
        if (playlistHeader) {
            playlistHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    const filtered = state.surahs.filter(s => {
        const nameEN = s.englishName.toLowerCase();
        const meanEN = s.englishNameTranslation.toLowerCase();
        const nameAR = normalizeArabic(s.name);
        const num = s.number.toString();
        
        return nameEN.includes(q) || 
               meanEN.includes(q) || 
               nameAR.includes(normalizedQ) || 
               s.name.includes(q) || // Exact match (with tashkil)
               num.includes(q);
    });
    
    renderSurahList(filtered);
}

headerSearchInput.addEventListener('input', (e) => performSearch(e.target.value));
surahSearchInput.addEventListener('input', (e) => performSearch(e.target.value));

languageSelect.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
});

themeToggleHeader.addEventListener('click', () => {
    state.settings.isDarkMode = !state.settings.isDarkMode;
    applySettingsUI();
});

// --- Rendering Logic ---
function updateRecitersUI() {
    renderReciters();
    renderReciterPanel();
}

function renderReciters() {
    recitersGrid.innerHTML = '';
    const lang = state.settings.language;
    RECITERS.slice(0, 4).forEach(reciter => {
        const card = document.createElement('div');
        card.className = `reciter-card ${state.currentReciter.id === reciter.id ? 'active' : ''}`;
        card.innerHTML = `
            <div class="img-container"><img src="${reciter.image}" alt="${reciter.name[lang]}"></div>
            <h4>${reciter.name[lang]}</h4>
            <span>${reciter.country[lang]}</span>
        `;
        card.onclick = () => selectReciter(reciter);
        recitersGrid.appendChild(card);
    });
}

function renderReciterPanel() {
    const list = document.getElementById('reciters-panel-list');
    const lang = state.settings.language;
    list.innerHTML = '';
    RECITERS.forEach(reciter => {
        const card = document.createElement('div');
        card.className = `reciter-panel-card ${state.currentReciter.id === reciter.id ? 'active' : ''}`;
        card.innerHTML = `
            <img src="${reciter.image}" alt="${reciter.name[lang]}">
            <div class="reciter-panel-info">
                <h4>${reciter.name[lang]}</h4>
                <p>${reciter.description[lang]}</p>
            </div>
            <button class="select-rec-btn">${TRANSLATIONS[lang].btn_select}</button>
        `;
        card.onclick = () => {
            selectReciter(reciter);
            hideAllModals();
        };
        list.appendChild(card);
    });
}

function renderSettingsOptions() {
    const lang = state.settings.language;
    defaultReciterSelect.innerHTML = RECITERS.map(r =>
        `<option value="${r.id}" ${state.settings.defaultReciterId === r.id ? 'selected' : ''}>${r.name[lang]}</option>`
    ).join('');
}

/**
 * SURAH LIST RENDERER
 * Generates the 114 surah items with Arabic/English names.
 * @param {Array} surahsToRender - List of surah objects to display.
 */
function renderSurahList(surahsToRender) {
    if (!surahListContainer) return;
    const lang = state.settings.language;

    if (!surahsToRender || surahsToRender.length === 0) {
        surahListContainer.innerHTML = `<div class="no-results-msg">${TRANSLATIONS[lang].no_results}</div>`;
        return;
    }

    surahListContainer.innerHTML = '';
    surahsToRender.forEach((surah) => {
        const actualIndex = state.surahs.findIndex(s => s.number === surah.number);
        const item = document.createElement('div');
        item.className = `surah-item ${state.currentSurahIndex === actualIndex ? 'playing' : ''}`;

        const isFav = state.favorites.includes(surah.number);

        item.innerHTML = `
            <div class="surah-num">${surah.number}</div>
            <div class="surah-info">
                <h5>${surah.englishName}</h5>
                <p>${surah.englishNameTranslation} • ${surah.numberOfAyahs} Ayahs</p>
            </div>
            <div class="surah-arabic">${surah.name}</div>
            <button class="fav-btn ${isFav ? 'active' : ''}" aria-label="Toggle Favorite">
                <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
            </button>
        `;

        item.onclick = () => selectSurah(actualIndex);

        const favBtn = item.querySelector('.fav-btn');
        favBtn.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(surah.number);
        };

        surahListContainer.appendChild(item);
    });
}

function renderFavoritesList() {
    if (!favoritesListContainer) return;
    const lang = state.settings.language;

    if (state.favorites.length === 0) {
        favoritesListContainer.innerHTML = `<div class="no-favorites-msg">${TRANSLATIONS[lang].no_favorites}</div>`;
        return;
    }

    favoritesListContainer.innerHTML = '';

    const favSurahs = state.surahs.filter(s => state.favorites.includes(s.number));

    favSurahs.forEach((surah) => {
        const actualIndex = state.surahs.findIndex(s => s.number === surah.number);
        const item = document.createElement('div');
        item.className = `surah-item ${state.currentSurahIndex === actualIndex ? 'playing' : ''}`;

        item.innerHTML = `
            <div class="surah-num">${surah.number}</div>
            <div class="surah-info">
                <h5>${surah.englishName}</h5>
                <p>${surah.englishNameTranslation} • ${surah.numberOfAyahs} Ayahs</p>
            </div>
            <div class="surah-arabic">${surah.name}</div>
            <button class="fav-btn active" aria-label="Remove Favorite">
                <i class="fas fa-heart"></i>
            </button>
        `;

        item.onclick = () => selectSurah(actualIndex);

        const favBtn = item.querySelector('.fav-btn');
        favBtn.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(surah.number);
        };

        favoritesListContainer.appendChild(item);
    });
}

function toggleFavorite(number) {
    const index = state.favorites.indexOf(number);
    if (index === -1) {
        state.favorites.push(number);
    } else {
        state.favorites.splice(index, 1);
    }

    renderSurahList(state.surahs);
    renderFavoritesList();
    updatePlayerFavIcon();
    saveSettings();
}

function updatePlayerFavIcon() {
    if (state.currentSurahIndex === -1) {
        playerFavBtn.style.visibility = 'hidden';
        return;
    }
    
    if (!playerFavBtn) return;
    playerFavBtn.style.visibility = 'visible';
    const surah = state.surahs[state.currentSurahIndex];
    if (!surah) return;
    const isFav = state.favorites.includes(surah.number);
    
    playerFavBtn.classList.toggle('active', isFav);
    const icon = playerFavBtn.querySelector('i');
    if (icon) icon.className = isFav ? 'fas fa-heart' : 'far fa-heart';
}

// --- Selection Logic ---
function selectReciter(reciter) {
    state.currentReciter = reciter;
    updateRecitersUI();
    updatePlayerInfoUI();

    if (state.currentSurahIndex !== -1) {
        playSurah(state.currentSurahIndex);
    }
}

function selectSurah(index) {
    state.currentSurahIndex = index;
    playSurah(index);
}

function setupInitialSession(index) {
    state.currentSurahIndex = index;
    const surah = state.surahs[index];
    if (!surah) return;
    const surahNumber = String(surah.number).padStart(3, '0');
    audio.src = `${state.currentReciter.server}${surahNumber}.mp3`;
    if (playerStatus) playerStatus.textContent = TRANSLATIONS[state.settings.language].status_paused;
    updateSurahListHighlight();
    updatePlayerInfoUI();
}

function updatePlayerInfoUI() {
    const lang = state.settings.language;

    if (playerReciterImg) playerReciterImg.src = state.currentReciter.image;
    if (playingReciterName) playingReciterName.textContent = state.currentReciter.name[lang];

    if (state.currentSurahIndex !== -1 && state.surahs.length > 0) {
        const surah = state.surahs[state.currentSurahIndex];
        if (!surah) return;
        // Show dual names in player as well
        if (playingSurahTitle) playingSurahTitle.textContent = `${surah.number}. ${surah.englishName} - ${surah.name}`;
        updatePlayerFavIcon();
    }
}

// Compatibility Alias for legacy/cached calls
const updateFeaturedUI = updatePlayerInfoUI;

/**
 * AUDIO PLAYBACK ENGINE
 * Handles MP3 URL construction and Audio API calls.
 */
function playSurah(index) {
    const surah = state.surahs[index];
    if (!surah) return;
    const surahNumber = String(surah.number).padStart(3, '0');
    audio.src = `${state.currentReciter.server}${surahNumber}.mp3`;

    audio.play()
        .then(() => {
            state.isPlaying = true;
            updatePlayerUI();
            updateSurahListHighlight();
            saveSettings();
        })
        .catch(() => { playerStatus.textContent = TRANSLATIONS[state.settings.language].status_error; });
}

function togglePlay() {
    if (state.currentSurahIndex === -1) {
        selectSurah(0);
        return;
    }
    if (state.isPlaying) { 
        audio.pause(); 
        state.isPlaying = false; 
        updatePlayerUI();
    }
    else { 
        audio.play()
            .then(() => {
                state.isPlaying = true;
                updatePlayerUI();
            })
            .catch(err => {
                console.error("Playback failed:", err);
                playerStatus.textContent = TRANSLATIONS[state.settings.language].status_error;
                state.isPlaying = false;
                updatePlayerUI();
            });
    }
}

function updatePlayerUI() {
    const lang = state.settings.language;
    const icon = playPauseBtn ? playPauseBtn.querySelector('i') : null;
    if (icon) icon.className = state.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    if (playerStatus) {
        playerStatus.textContent = state.isPlaying ? TRANSLATIONS[lang].status_playing : TRANSLATIONS[lang].status_paused;
        playerStatus.classList.toggle('active', state.isPlaying);
    }
}

function updateSurahListHighlight() {
    document.querySelectorAll('.surah-item').forEach((item, i) => {
        item.classList.toggle('playing', i === state.currentSurahIndex);
    });
}

// --- Controls Events ---
playPauseBtn.onclick = togglePlay;
prevBtn.onclick = () => selectSurah((state.currentSurahIndex - 1 + state.surahs.length) % state.surahs.length);
nextBtn.onclick = () => selectSurah((state.currentSurahIndex + 1) % state.surahs.length);
skipBackBtn.onclick = () => audio.currentTime -= 10;
skipForwardBtn.onclick = () => audio.currentTime += 10;

autoplayToggleQuick.onclick = () => {
    state.settings.isAutoplay = !state.settings.isAutoplay;
    applySettingsUI();
};

audio.ontimeupdate = () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
};

progressWrap.onclick = (e) => {
    audio.currentTime = (e.offsetX / progressWrap.clientWidth) * audio.duration;
};

volumeSlider.oninput = (e) => {
    state.settings.volume = e.target.value;
    audio.volume = state.settings.volume;
    updateVolumeIcon(state.settings.volume);
    saveSettings();
};

function updateVolumeIcon(vol) {
    if (vol <= 0.01) volumeIcon.className = 'fas fa-volume-mute';
    else if (vol < 0.5) volumeIcon.className = 'fas fa-volume-down';
    else volumeIcon.className = 'fas fa-volume-up';
}

audio.onended = () => {
    if (state.settings.isAutoplay) nextBtn.click();
    else { state.isPlaying = false; updatePlayerUI(); }
};

// --- Settings Logic ---
autoplaySwitch.onchange = (e) => { state.settings.isAutoplay = e.target.checked; applySettingsUI(); };
rememberSwitch.onchange = (e) => { state.settings.rememberSession = e.target.checked; saveSettings(); };
darkModeSwitch.onchange = (e) => { state.settings.isDarkMode = e.target.checked; applyTheme(); };
defaultReciterSelect.onchange = (e) => { state.settings.defaultReciterId = e.target.value; saveSettings(); };

function applyTheme() {
    document.body.classList.toggle('dark-theme', state.settings.isDarkMode);

    // Update Icons
    if (themeToggleHeader) {
        const themeIcon = themeToggleHeader.querySelector('i');
        if (themeIcon) {
            if (state.settings.isDarkMode) {
                themeIcon.className = 'fas fa-sun';
                themeToggleHeader.title = state.settings.language === 'en' ? 'Switch to Light Mode' : 'الوضع النهاري';
            } else {
                themeIcon.className = 'fas fa-moon';
                themeToggleHeader.title = state.settings.language === 'en' ? 'Switch to Dark Mode' : 'الوضع الليلي';
            }
        }
    }

    saveSettings();
}

function applySettingsUI() {
    autoplayToggleQuick.classList.toggle('active', state.settings.isAutoplay);
    autoplaySwitch.checked = state.settings.isAutoplay;
    rememberSwitch.checked = state.settings.rememberSession;
    darkModeSwitch.checked = state.settings.isDarkMode;
    applyTheme();
    saveSettings();
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// --- LocalStorage ---
function saveSettings() {
    localStorage.setItem('quran_player_full_v3', JSON.stringify({
        settings: state.settings,
        currentSurahIndex: state.currentSurahIndex,
        currentReciterId: state.currentReciter.id,
        favorites: state.favorites
    }));
}

function loadSettings() {
    const saved = localStorage.getItem('quran_player_full_v3');
    if (saved) {
        const data = JSON.parse(saved);
        state.settings = { ...state.settings, ...data.settings };
        state.favorites = data.favorites || [];
        if (data.currentReciterId) {
            state.currentReciter = RECITERS.find(r => r.id === data.currentReciterId) || RECITERS[0];
        }
        state.lastSessionIndex = data.currentSurahIndex;
    } else {
        state.currentReciter = RECITERS.find(r => r.id === state.settings.defaultReciterId) || RECITERS[0];
    }
}

function applySettings() {
    audio.volume = state.settings.volume;
    volumeSlider.value = state.settings.volume;
    updateVolumeIcon(state.settings.volume);
    applySettingsUI();
}

// Start app automatically via DOMContentLoaded listener
