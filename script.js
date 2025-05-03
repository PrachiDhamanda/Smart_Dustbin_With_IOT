class SmartBinManager {
    constructor() {
        this.bins = [];
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('smartBinUsers')) || {};
        this.checkAuth();
        this.setupSidebar();
    }

    checkAuth() {
        const user = JSON.parse(localStorage.getItem('smartBinCurrentUser'));
        if (user) {
            this.currentUser = user;
            this.bins = JSON.parse(localStorage.getItem(`smartBins_${user.username}`)) || [];
            this.showMainContent();
            this.initializeApp();
        } else {
            this.showAuthForm();
        }
    }

    showAuthForm(isSignUp = false) {
        const authContainer = document.getElementById('authContainer');
        const mainContainer = document.getElementById('mainContainer');
        const authTitle = document.getElementById('authTitle');
        const authSubmit = document.getElementById('authSubmit');
        const toggleText = document.getElementById('toggleText');
        const toggleAuth = document.getElementById('toggleAuth');

        authContainer.style.display = 'flex';
        mainContainer.style.display = 'none';
        authTitle.textContent = isSignUp ? 'Sign Up' : 'Sign In';
        authSubmit.textContent = isSignUp ? 'Sign Up' : 'Sign In';
        toggleText.textContent = isSignUp ? 'Already have an account? ' : 'Don\'t have an account? ';
        toggleAuth.textContent = isSignUp ? 'Sign In' : 'Sign Up';

        toggleAuth.onclick = () => this.showAuthForm(!isSignUp);
        document.getElementById('authForm').onsubmit = (e) => {
            e.preventDefault();
            isSignUp ? this.signUp() : this.signIn();
        };
    }

    signUp() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const authError = document.getElementById('authError');

        if (this.users[username]) {
            authError.textContent = 'Username already exists';
            authError.style.display = 'block';
            return;
        }

        this.users[username] = { password, createdAt: new Date().toISOString() };
        localStorage.setItem('smartBinUsers', JSON.stringify(this.users));
        this.currentUser = { username };
        localStorage.setItem('smartBinCurrentUser', JSON.stringify(this.currentUser));
        this.bins = [];
        this.saveBins();
        this.showMainContent();
        this.initializeApp();
        this.showNotification('Account created successfully!', 'success');
    }

    signIn() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const authError = document.getElementById('authError');

        if (!this.users[username] || this.users[username].password !== password) {
            authError.textContent = 'Invalid username or password';
            authError.style.display = 'block';
            return;
        }

        this.currentUser = { username };
        localStorage.setItem('smartBinCurrentUser', JSON.stringify(this.currentUser));
        this.bins = JSON.parse(localStorage.getItem(`smartBins_${username}`)) || [];
        this.showMainContent();
        this.initializeApp();
        this.showNotification(`Welcome back, ${username}!`, 'success');
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('smartBinCurrentUser');
        this.showAuthForm();
    }

    showMainContent() {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('mainContainer').style.display = 'block';
        const userNameDisplay = document.getElementById('userNameDisplay');
        const userAvatar = document.getElementById('userAvatar');
        const profileUsername = document.getElementById('profileUsername');
        const profileCreated = document.getElementById('profileCreated');
        userNameDisplay.textContent = this.currentUser.username;
        userAvatar.textContent = this.currentUser.username.charAt(0).toUpperCase();
        profileUsername.textContent = this.currentUser.username;
        profileCreated.textContent = new Date(this.users[this.currentUser.username].createdAt).toLocaleString();
    }

    initializeApp() {
        this.renderBins();
        this.setupEventListeners();
        this.startMonitoring();
    }

    setupEventListeners() {
        document.getElementById('addBinForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewBin();
        });

        document.getElementById('navDashboard').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('dashboard');
        });

        document.getElementById('navAddBin').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('addBin');
        });

        document.getElementById('navProfile').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('profile');
        });
    }

    setupSidebar() {
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            hamburger.classList.toggle('active');
            mainContent.classList.toggle('sidebar-active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 767 && sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
                mainContent.classList.remove('sidebar-active');
            }
        });
    }

    showSection(section) {
        const dashboard = document.getElementById('dashboard');
        const addBinSection = document.getElementById('addBinSection');
        const profileSection = document.getElementById('profileSection');
        const navLinks = document.querySelectorAll('.sidebar-nav a');

        navLinks.forEach(link => link.classList.remove('active'));
        if (section === 'dashboard') {
            dashboard.style.display = 'grid';
            addBinSection.style.display = 'block';
            profileSection.style.display = 'none';
            document.getElementById('navDashboard').classList.add('active');
        } else if (section === 'addBin') {
            dashboard.style.display = 'grid';
            addBinSection.style.display = 'block';
            profileSection.style.display = 'none';
            document.getElementById('navAddBin').classList.add('active');
            document.getElementById('addBinSection').scrollIntoView({ behavior: 'smooth' });
        } else if (section === 'profile') {
            dashboard.style.display = 'none';
            addBinSection.style.display = 'none';
            profileSection.style.display = 'block';
            document.getElementById('navProfile').classList.add('active');
        }

        // Close sidebar on mobile after clicking a link
        if (window.innerWidth <= 767) {
            document.getElementById('sidebar').classList.remove('active');
            document.getElementById('hamburger').classList.remove('active');
            document.getElementById('mainContent').classList.remove('sidebar-active');
        }
    }

    addNewBin() {
        const nameInput = document.getElementById('binName');
        const ipInput = document.getElementById('binIP');

        const ipValue = ipInput.value.trim();
        if (!ipValue.match(/^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/)) {
            this.showNotification('Invalid IP address format', 'error');
            return;
        }

        const newBin = {
            id: Date.now().toString(),
            name: nameInput.value.trim(),
            ipAddress: ipValue.startsWith('https://') ? ipValue : `http://${ipValue}`,
            fillLevel: 0,
            lidStatus: 'closed',
            lastUpdated: new Date().toISOString(),
            isLoading: false
        };

        this.bins.push(newBin);
        this.saveBins();
        this.renderBins();
        nameInput.value = '';
        ipInput.value = '';
        this.refreshBin(newBin);
        this.showNotification(`Bin "${newBin.name}" added successfully!`, 'success');
    }

    async refreshBin(bin) {
        const binElement = document.getElementById(`bin-${bin.id}`);
        if (binElement) {
            const loadingIndicator = binElement.querySelector('.loading');
            if (loadingIndicator) loadingIndicator.style.display = 'inline-block';
        }

        bin.isLoading = true;
        this.updateBinUI(bin);

        try {
            const response = await fetch(`${bin.ipAddress}/fill`, { timeout: 5000 });
            if (!response.ok) throw new Error('Failed to fetch fill level');

            const fillLevel = parseInt(await response.text());
            bin.fillLevel = Math.max(0, Math.min(100, fillLevel));
            bin.lastUpdated = new Date().toISOString();
            bin.isLoading = false;
            delete bin.error;

            this.saveBins();
            this.updateBinUI(bin);
            this.checkAlerts();
        } catch (error) {
            console.error(`Error updating bin ${bin.name}:`, error);
            bin.isLoading = false;
            bin.error = error.message;
            this.updateBinUI(bin);
            this.showNotification(`Error updating ${bin.name}: ${error.message}`, 'error');
        }
    }

    async controlLid(binId, action) {
        const bin = this.bins.find(b => b.id === binId);
        if (!bin) return;

        bin.isLoading = true;
        this.updateBinUI(bin);

        try {
            const response = await fetch(`${bin.ipAddress}/lid/${action}`, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                timeout: 5000
            });

            if (!response.ok) throw new Error(`Failed to ${action} lid`);

            bin.lidStatus = action;
            bin.isLoading = false;
            delete bin.error;

            this.saveBins();
            this.updateBinUI(bin);
            this.showNotification(`${bin.name} lid ${action === 'open' ? 'opened' : 'closed'} successfully`, 'success');
        } catch (error) {
            console.error(`Error controlling ${bin.name} lid:`, error);
            bin.isLoading = false;
            bin.error = error.message;
            this.updateBinUI(bin);
            this.showNotification(`Error: ${error.message}`, 'error');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type}`;
        notification.innerHTML = `
            <span class="alert-icon">${type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅'}</span>
            <span>${message}</span>
        `;
        document.getElementById('alerts').appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    deleteBin(id) {
        if (confirm('Are you sure you want to delete this bin?')) {
            this.bins = this.bins.filter(bin => bin.id !== id);
            this.saveBins();
            this.renderBins();
            this.checkAlerts();
            this.showNotification('Bin deleted successfully', 'success');
        }
    }

    saveBins() {
        if (this.currentUser) {
            localStorage.setItem(`smartBins_${this.currentUser.username}`, JSON.stringify(this.bins));
        }
    }

    checkAlerts() {
        const alertsDiv = document.getElementById('alerts');
        alertsDiv.innerHTML = '';

        this.bins.forEach(bin => {
            if (bin.fillLevel >= 100) {
                const alert = document.createElement('div');
                alert.className = 'alert alert-danger';
                alert.innerHTML = `
                    <span class="alert-icon">🗑️</span>
                    <span>CRITICAL: ${bin.name} is 100% full! Empty immediately!</span>
                `;
                alertsDiv.appendChild(alert);
            } else if (bin.fillLevel >= 80) {
                const alert = document.createElement('div');
                alert.className = 'alert alert-warning';
                alert.innerHTML = `
                    <span class="alert-icon">⚠️</span>
                    <span>Warning: ${bin.name} is ${bin.fillLevel}% full! Schedule emptying soon.</span>
                `;
                alertsDiv.appendChild(alert);
            }
        });
    }

    updateBinUI(bin) {
        const binElement = document.getElementById(`bin-${bin.id}`);
        if (!binElement) return;

        const fillLevelElement = binElement.querySelector('.fill-level');
        const progressFillElement = binElement.querySelector('.progress-fill');
        const statusIndicator = binElement.querySelector('.status-indicator');
        const statusText = binElement.querySelector('.status-text');
        const lastUpdatedElement = binElement.querySelector('.last-updated');
        const loadingIndicator = binElement.querySelector('.loading');
        const errorElement = binElement.querySelector('.bin-error');

        if (fillLevelElement) fillLevelElement.textContent = `${bin.fillLevel}%`;
        if (progressFillElement) {
            progressFillElement.style.width = `${bin.fillLevel}%`;
            progressFillElement.className = 'progress-fill';
            if (bin.fillLevel >= 100) {
                progressFillElement.classList.add('danger');
            } else if (bin.fillLevel >= 80) {
                progressFillElement.classList.add('warning');
            }
        }
        if (statusIndicator) {
            statusIndicator.style.backgroundColor = bin.lidStatus === 'open' ? 'var(--warning)' : 'var(--success)';
        }
        if (statusText) {
            statusText.textContent = `Lid is ${bin.lidStatus}`;
        }
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = `Last updated: ${new Date(bin.lastUpdated).toLocaleString()}`;
        }
        if (loadingIndicator) {
            loadingIndicator.style.display = bin.isLoading ? 'inline-block' : 'none';
        }
        if (errorElement) {
            errorElement.textContent = bin.error ? `Error: ${bin.error}` : '';
            errorElement.style.display = bin.error ? 'block' : 'none';
        }
    }

    renderBins() {
        const binsContainer = document.getElementById('binsContainer');

        if (this.bins.length === 0) {
            binsContainer.innerHTML = `
                <div class="empty-state">
                    <h3>No bins added yet</h3>
                    <p>Add your first smart bin using the form above</p>
                </div>
            `;
            return;
        }

        binsContainer.innerHTML = '';

        this.bins.forEach(bin => {
            const binCard = document.createElement('div');
            binCard.className = 'bin-card';
            binCard.id = `bin-${bin.id}`;

            binCard.innerHTML = `
                <div class="bin-header">
                    <span class="bin-name">${bin.name}</span>
                    <div class="tooltip">
                        <button class="btn btn-sm btn-danger" onclick="binManager.deleteBin('${bin.id}')">×</button>
                        <span class="tooltiptext">Delete bin</span>
                    </div>
                </div>
                <div class="bin-body">
                    <div class="bin-ip">${bin.ipAddress}</div>
                    <div class="bin-status">
                        <div class="status-indicator"></div>
                        <span class="status-text">Lid is ${bin.lidStatus}</span>
                        <span class="loading" style="display: ${bin.isLoading ? 'inline-block' : 'none'}"></span>
                    </div>
                    <div class="progress-container">
                        <div>Fill Level: <span class="fill-level">${bin.fillLevel}</span>%</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${bin.fillLevel}%"></div>
                        </div>
                    </div>
                    <div class="bin-error" style="display: none;"></div>
                    <div class="last-updated">
                        Last updated: ${new Date(bin.lastUpdated).toLocaleString()}
                    </div>
                    <div class="bin-actions">
                        <button class="btn" onclick="binManager.controlLid('${bin.id}', 'open')">Open Lid</button>
                        <button class="btn" onclick="binManager.controlLid('${bin.id}', 'close')">Close Lid</button>
                        <button class="btn" onclick="binManager.refreshBin(binManager.bins.find(b => b.id === '${bin.id}'))">Refresh</button>
                    </div>
                </div>
            `;
            binsContainer.appendChild(binCard);
            this.updateBinUI(bin);
        });

        this.checkAlerts();
    }

    startMonitoring() {
        setInterval(() => {
            this.bins.forEach(bin => this.refreshBin(bin));
        }, 30000);
        setTimeout(() => {
            this.bins.forEach(bin => this.refreshBin(bin));
        }, 1000);
    }
}

const binManager = new SmartBinManager();
