class RTIFormHandler {
    constructor() {
        this.formData = new Map();
    }

    static validateForm(formData) {
        const requiredFields = ['name', 'email', 'phone', 'address', 'subject', 'description'];
        const errors = [];

        requiredFields.forEach(field => {
            if (!formData.get(field) || formData.get(field).trim() === '') {
                errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            }
        });

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.get('email') && !emailRegex.test(formData.get('email'))) {
            errors.push('Please enter a valid email address');
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (formData.get('phone') && !phoneRegex.test(formData.get('phone'))) {
            errors.push('Please enter a valid 10-digit phone number');
        }

        return errors;
    }

    static generateRTIID() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `RTI${timestamp}${random}`;
    }

    submitForm(formElement) {
        return new Promise((resolve, reject) => {
            const formData = new FormData(formElement);
            const data = new Map();
            
            for (let [key, value] of formData.entries()) {
                data.set(key, value);
            }

            const errors = RTIFormHandler.validateForm(data);
            
            if (errors.length > 0) {
                reject({ type: 'validation', errors });
                return;
            }

            // Generate RTI ID
            const rtiId = RTIFormHandler.generateRTIID();
            data.set('rtiId', rtiId);
            data.set('status', 'Submitted');
            data.set('submissionDate', new Date().toISOString());

            // Store in localStorage (in a real app, this would be sent to a server)
            try {
                const submissions = JSON.parse(localStorage.getItem('rtiSubmissions') || '[]');
                submissions.push(Object.fromEntries(data));
                localStorage.setItem('rtiSubmissions', JSON.stringify(submissions));
                
                resolve({
                    success: true,
                    rtiId,
                    message: 'Your RTI application has been submitted successfully'
                });
            } catch (error) {
                reject({
                    type: 'storage',
                    error: 'Failed to save your application. Please try again.'
                });
            }
        });
    }

    static trackRTI(rtiId) {
        try {
            const submissions = JSON.parse(localStorage.getItem('rtiSubmissions') || '[]');
            const submission = submissions.find(s => s.rtiId === rtiId);
            
            if (!submission) {
                throw new Error('RTI application not found');
            }

            return {
                success: true,
                data: submission
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    static getStatusColor(status) {
        const statusColors = {
            'Submitted': '#2196F3',
            'Under Review': '#FF9800',
            'Additional Info Required': '#FFC107',
            'Approved': '#4CAF50',
            'Rejected': '#F44336',
            'Closed': '#9E9E9E'
        };
        return statusColors[status] || '#9E9E9E';
    }

    static displayNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
} 