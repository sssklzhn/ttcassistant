import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import axios from 'axios';
import '../../styles/Profile.css';

function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        company: user.company || 'ТрансТелеком'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.put('/api/users/profile', formData);
      updateUser(response.data.user);
      setMessage('✅ Профиль успешно обновлен');
      
      // Автоматически скрываем сообщение через 3 секунды
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || '❌ Ошибка обновления профиля');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return React.createElement('div', { className: 'profile-loading' },
      React.createElement('div', { className: 'loading' }),
      'Загрузка профиля...'
    );
  }

  return React.createElement('div', { className: 'profile-page' },
    React.createElement('div', { className: 'profile-header' },
      React.createElement('h1', null, '👤 Мой профиль'),
      React.createElement('p', { className: 'profile-description' }, 
        'Управление вашей учетной записью ТрансТелеком'
      )
    ),

    React.createElement('div', { className: 'profile-container' },
      // Карточка профиля
      React.createElement('div', { className: 'profile-card' },
        React.createElement('div', { className: 'profile-avatar-section' },
          React.createElement('div', { className: 'avatar-circle' },
            React.createElement('span', { className: 'avatar-icon' }, 
              user.role === 'admin' ? '👑' : '👤'
            )
          ),
          React.createElement('div', { className: 'profile-basic-info' },
            React.createElement('h2', { className: 'profile-name' }, user.fullName),
            React.createElement('div', { className: 'profile-badges' },
              React.createElement('span', { 
                className: `role-badge ${user.role === 'admin' ? 'admin-badge' : 'user-badge'}` 
              }, 
                user.role === 'admin' ? '👑 Администратор' : '👤 Сотрудник'
              ),
              React.createElement('span', { 
                className: `status-badge ${user.isActive ? 'active-badge' : 'inactive-badge'}` 
              }, 
                user.isActive ? '✅ Активен' : '⏸️ Неактивен'
              )
            )
          )
        ),

        message && React.createElement('div', { className: 'alert alert-success' }, message),
        error && React.createElement('div', { className: 'alert alert-error' }, error),

        React.createElement('form', { onSubmit: handleSubmit, className: 'profile-form' },
          React.createElement('div', { className: 'form-row' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { htmlFor: 'fullName', className: 'form-label' }, 'Полное имя'),
              React.createElement('input', {
                type: 'text',
                id: 'fullName',
                name: 'fullName',
                value: formData.fullName,
                onChange: handleChange,
                className: 'form-input',
                required: true,
                placeholder: 'Введите ваше полное имя'
              })
            ),

            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { htmlFor: 'email', className: 'form-label' }, 'Email адрес'),
              React.createElement('input', {
                type: 'email',
                id: 'email',
                name: 'email',
                value: formData.email,
                onChange: handleChange,
                className: 'form-input',
                required: true,
                placeholder: 'your.email@example.com'
              })
            )
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'company', className: 'form-label' }, 'Компания'),
            React.createElement('input', {
              type: 'text',
              id: 'company',
              name: 'company',
              value: formData.company,
              onChange: handleChange,
              className: 'form-input',
              placeholder: 'ТрансТелеком'
            })
          ),

          React.createElement('button', {
            type: 'submit',
            className: 'btn btn-primary save-btn',
            disabled: loading
          }, 
            loading ? 
              React.createElement('div', null,
                React.createElement('div', { className: 'loading' }),
                ' Сохранение...'
              ) : 
              React.createElement('div', null,
                React.createElement('span', { className: 'btn-icon' }, '💾'),
                ' Сохранить изменения'
              )
          )
        )
      ),

      // Информация об аккаунте
      React.createElement('div', { className: 'profile-info-card' },
        React.createElement('h3', null, '📊 Информация об аккаунте'),
        React.createElement('div', { className: 'info-grid' },
          React.createElement('div', { className: 'info-item' },
            React.createElement('span', { className: 'info-label' }, 'ID пользователя:'),
            React.createElement('span', { className: 'info-value' }, user.id || user._id)
          ),
          React.createElement('div', { className: 'info-item' },
            React.createElement('span', { className: 'info-label' }, 'Дата регистрации:'),
            React.createElement('span', { className: 'info-value' }, 
              new Date(user.createdAt).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            )
          ),
          React.createElement('div', { className: 'info-item' },
            React.createElement('span', { className: 'info-label' }, 'Последнее обновление:'),
            React.createElement('span', { className: 'info-value' }, 
              new Date(user.updatedAt).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            )
          ),
          React.createElement('div', { className: 'info-item' },
            React.createElement('span', { className: 'info-label' }, 'Роль в системе:'),
            React.createElement('span', { className: 'info-value' }, 
              user.role === 'admin' ? 'Администратор' : 'Сотрудник'
            )
          )
        )
      )
    )
  );
}

export default Profile;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext.js';
// import axios from 'axios';
// import '../../styles/Profile.css';
// import {
//   UserIcon,
//   ShieldIcon,
//   MailIcon,
//   BuildingIcon,
//   SaveIcon,
//   ClockIcon,
//   KeyIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   ActivityIcon,
//   CrownIcon,
//   SparklesIcon,
//   GlobeIcon,
//   EditIcon,
//   VerifiedIcon,
//   ServerIcon,
//   DatabaseIcon,
//   CpuIcon,
//   NetworkIcon,
//   LockIcon,
//   SettingsIcon,
//   BellIcon,
//   DownloadIcon,
//   UploadIcon,
//   EyeIcon,
//   EyeOffIcon
// } from '../../assets/icons';

// function Profile() {
//   const { user, updateUser } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     company: '',
//     department: '',
//     phone: '',
//     title: ''
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('personal');
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   useEffect(() => {
//     if (user) {
//       const nameParts = user.fullName?.split(' ') || ['', ''];
//       setFormData({
//         firstName: nameParts[0] || '',
//         lastName: nameParts.slice(1).join(' ') || '',
//         email: user.email || '',
//         company: user.company || 'Transtelecom',
//         department: user.department || '',
//         phone: user.phone || '',
//         title: user.title || ''
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     if (error) setError('');
//   };

//   const handlePasswordChange = (e) => {
//     setPasswordData({
//       ...passwordData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const calculatePasswordStrength = (password) => {
//     let score = 0;
//     if (password.length >= 8) score += 25;
//     if (/[A-Z]/.test(password)) score += 25;
//     if (/[0-9]/.test(password)) score += 25;
//     if (/[^A-Za-z0-9]/.test(password)) score += 25;
//     return score;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setMessage({ type: '', text: '' });

//     try {
//       const profileData = {
//         ...formData,
//         fullName: `${formData.firstName} ${formData.lastName}`.trim()
//       };

//       const response = await axios.put('/api/users/profile', profileData);
//       updateUser(response.data.user);
      
//       setMessage({ 
//         type: 'success', 
//         text: 'Profile updated successfully'
//       });
      
//       setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update profile');
//       console.error('Error updating profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePasswordUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setMessage({ type: '', text: '' });

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setError('New passwords do not match');
//       setLoading(false);
//       return;
//     }

//     try {
//       await axios.put('/api/users/password', {
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword
//       });
      
//       setMessage({ 
//         type: 'success', 
//         text: 'Password updated successfully'
//       });
      
//       setPasswordData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
      
//       setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getInitials = () => {
//     if (!user?.fullName) return 'TT';
//     return user.fullName
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase();
//   };

//   const getActivityLevel = () => {
//     return 85;
//   };

//   if (!user) {
//     const loadingContainer = document.createElement('div');
//     loadingContainer.className = 'profile-loading';
    
//     const loadingAnimation = document.createElement('div');
//     loadingAnimation.className = 'loading-animation';
    
//     const spinner = document.createElement('div');
//     spinner.className = 'spinner';
    
//     loadingAnimation.appendChild(spinner);
//     loadingContainer.appendChild(loadingAnimation);
    
//     const loadingText = document.createElement('span');
//     loadingText.textContent = 'Loading profile...';
//     loadingContainer.appendChild(loadingText);
    
//     return loadingContainer;
//   }

//   // Создание основного контейнера
//   const profilePage = document.createElement('div');
//   profilePage.className = 'profile-page';

//   // Header
//   const profileHeader = document.createElement('div');
//   profileHeader.className = 'profile-header';

//   const headerContent = document.createElement('div');
//   headerContent.className = 'header-content';

//   const headerIconWrapper = document.createElement('div');
//   headerIconWrapper.className = 'header-icon-wrapper';
//   const headerIcon = document.createElement(UserIcon);
//   headerIcon.className = 'header-icon';
//   const iconGlow = document.createElement('div');
//   iconGlow.className = 'icon-glow';
  
//   headerIconWrapper.appendChild(headerIcon);
//   headerIconWrapper.appendChild(iconGlow);

//   const headerText = document.createElement('div');
//   headerText.className = 'header-text';
  
//   const pageTitle = document.createElement('h1');
//   pageTitle.className = 'page-title';
//   pageTitle.textContent = 'My Profile';
  
//   const pageSubtitle = document.createElement('p');
//   pageSubtitle.className = 'page-subtitle';
//   pageSubtitle.textContent = 'Manage your TTC Enterprise AI account and preferences';
  
//   headerText.appendChild(pageTitle);
//   headerText.appendChild(pageSubtitle);
  
//   headerContent.appendChild(headerIconWrapper);
//   headerContent.appendChild(headerText);

//   const headerStats = document.createElement('div');
//   headerStats.className = 'header-stats';

//   // Activity stat card
//   const activityStatCard = document.createElement('div');
//   activityStatCard.className = 'stat-card';
  
//   const activityIcon = document.createElement(ActivityIcon);
//   activityIcon.className = 'stat-icon';
  
//   const activityStatContent = document.createElement('div');
//   activityStatContent.className = 'stat-content';
  
//   const activityStatValue = document.createElement('span');
//   activityStatValue.className = 'stat-value';
//   activityStatValue.textContent = '85%';
  
//   const activityStatLabel = document.createElement('span');
//   activityStatLabel.className = 'stat-label';
//   activityStatLabel.textContent = 'Activity Level';
  
//   activityStatContent.appendChild(activityStatValue);
//   activityStatContent.appendChild(activityStatLabel);
  
//   activityStatCard.appendChild(activityIcon);
//   activityStatCard.appendChild(activityStatContent);

//   // Sessions stat card
//   const sessionsStatCard = document.createElement('div');
//   sessionsStatCard.className = 'stat-card';
  
//   const serverIcon = document.createElement(ServerIcon);
//   serverIcon.className = 'stat-icon';
  
//   const sessionsStatContent = document.createElement('div');
//   sessionsStatContent.className = 'stat-content';
  
//   const sessionsStatValue = document.createElement('span');
//   sessionsStatValue.className = 'stat-value';
//   sessionsStatValue.textContent = '247';
  
//   const sessionsStatLabel = document.createElement('span');
//   sessionsStatLabel.className = 'stat-label';
//   sessionsStatLabel.textContent = 'AI Sessions';
  
//   sessionsStatContent.appendChild(sessionsStatValue);
//   sessionsStatContent.appendChild(sessionsStatLabel);
  
//   sessionsStatCard.appendChild(serverIcon);
//   sessionsStatCard.appendChild(sessionsStatContent);

//   headerStats.appendChild(activityStatCard);
//   headerStats.appendChild(sessionsStatCard);
  
//   profileHeader.appendChild(headerContent);
//   profileHeader.appendChild(headerStats);

//   // Main container
//   const profileContainer = document.createElement('div');
//   profileContainer.className = 'profile-container';

//   // Left Panel - Profile Overview
//   const profileSidebar = document.createElement('div');
//   profileSidebar.className = 'profile-sidebar';

//   // Profile card
//   const profileCard = document.createElement('div');
//   profileCard.className = 'profile-card glass-card';

//   // Avatar section
//   const profileAvatarSection = document.createElement('div');
//   profileAvatarSection.className = 'profile-avatar-section';

//   const avatarContainer = document.createElement('div');
//   avatarContainer.className = 'avatar-container';

//   const avatarCircle = document.createElement('div');
//   avatarCircle.className = 'avatar-circle';

//   let avatarContent;
//   if (user.avatar) {
//     const avatarImage = document.createElement('img');
//     avatarImage.src = user.avatar;
//     avatarImage.alt = user.fullName;
//     avatarImage.className = 'avatar-image';
//     avatarContent = avatarImage;
//   } else {
//     const avatarInitials = document.createElement('div');
//     avatarInitials.className = 'avatar-initials';
//     avatarInitials.textContent = getInitials();
//     avatarContent = avatarInitials;
//   }

//   const avatarRing = document.createElement('div');
//   avatarRing.className = 'avatar-ring';
  
//   const avatarStatus = document.createElement('div');
//   avatarStatus.className = 'avatar-status active';

//   avatarCircle.appendChild(avatarContent);
//   avatarCircle.appendChild(avatarRing);
//   avatarCircle.appendChild(avatarStatus);

//   const avatarActions = document.createElement('div');
//   avatarActions.className = 'avatar-actions';

//   const changeAvatarBtn = document.createElement('button');
//   changeAvatarBtn.className = 'avatar-action-btn';
//   changeAvatarBtn.title = 'Change avatar';
//   const editIcon = document.createElement(EditIcon);
//   editIcon.className = 'action-icon';
//   changeAvatarBtn.appendChild(editIcon);

//   const takePhotoBtn = document.createElement('button');
//   takePhotoBtn.className = 'avatar-action-btn';
//   takePhotoBtn.title = 'Take photo';
//   const eyeIcon = document.createElement(EyeIcon);
//   eyeIcon.className = 'action-icon';
//   takePhotoBtn.appendChild(eyeIcon);

//   avatarActions.appendChild(changeAvatarBtn);
//   avatarActions.appendChild(takePhotoBtn);

//   avatarContainer.appendChild(avatarCircle);
//   avatarContainer.appendChild(avatarActions);

//   // Basic info
//   const profileBasicInfo = document.createElement('div');
//   profileBasicInfo.className = 'profile-basic-info';

//   const nameSection = document.createElement('div');
//   nameSection.className = 'name-section';

//   const profileName = document.createElement('h2');
//   profileName.className = 'profile-name';
//   profileName.textContent = user.fullName;
  
//   const verifiedBadge = document.createElement(VerifiedIcon);
//   verifiedBadge.className = 'verified-badge';
//   profileName.appendChild(verifiedBadge);

//   const profileTitle = document.createElement('p');
//   profileTitle.className = 'profile-title';
//   profileTitle.textContent = user.title || 'Enterprise User';

//   nameSection.appendChild(profileName);
//   nameSection.appendChild(profileTitle);

//   // Profile badges
//   const profileBadges = document.createElement('div');
//   profileBadges.className = 'profile-badges';

//   const roleBadge = document.createElement('div');
//   roleBadge.className = `role-badge ${user.role === 'admin' ? 'admin-badge' : 'user-badge'}`;
  
//   if (user.role === 'admin') {
//     const crownIcon = document.createElement(CrownIcon);
//     crownIcon.className = 'badge-icon';
//     roleBadge.appendChild(crownIcon);
    
//     const adminText = document.createElement('span');
//     adminText.textContent = 'Administrator';
//     roleBadge.appendChild(adminText);
//   } else {
//     const userIcon = document.createElement(UserIcon);
//     userIcon.className = 'badge-icon';
//     roleBadge.appendChild(userIcon);
    
//     const userText = document.createElement('span');
//     userText.textContent = 'Professional';
//     roleBadge.appendChild(userText);
//   }

//   const statusBadge = document.createElement('div');
//   statusBadge.className = `status-badge ${user.isActive ? 'active-badge' : 'inactive-badge'}`;
  
//   if (user.isActive) {
//     const checkIcon = document.createElement(CheckCircleIcon);
//     checkIcon.className = 'badge-icon';
//     statusBadge.appendChild(checkIcon);
    
//     const activeText = document.createElement('span');
//     activeText.textContent = 'Active';
//     statusBadge.appendChild(activeText);
//   } else {
//     const xIcon = document.createElement(XCircleIcon);
//     xIcon.className = 'badge-icon';
//     statusBadge.appendChild(xIcon);
    
//     const inactiveText = document.createElement('span');
//     inactiveText.textContent = 'Inactive';
//     statusBadge.appendChild(inactiveText);
//   }

//   profileBadges.appendChild(roleBadge);
//   profileBadges.appendChild(statusBadge);

//   profileBasicInfo.appendChild(nameSection);
//   profileBasicInfo.appendChild(profileBadges);

//   profileAvatarSection.appendChild(avatarContainer);
//   profileAvatarSection.appendChild(profileBasicInfo);

//   // Profile stats
//   const profileStats = document.createElement('div');
//   profileStats.className = 'profile-stats';

//   const statsGrid = document.createElement('div');
//   statsGrid.className = 'stats-grid';

//   // Projects stat
//   const projectsStat = document.createElement('div');
//   projectsStat.className = 'stat-item';
  
//   const dbIcon = document.createElement(DatabaseIcon);
//   dbIcon.className = 'stat-item-icon';
  
//   const projectsContent = document.createElement('div');
//   projectsContent.className = 'stat-item-content';
  
//   const projectsValue = document.createElement('span');
//   projectsValue.className = 'stat-item-value';
//   projectsValue.textContent = '24';
  
//   const projectsLabel = document.createElement('span');
//   projectsLabel.className = 'stat-item-label';
//   projectsLabel.textContent = 'Projects';
  
//   projectsContent.appendChild(projectsValue);
//   projectsContent.appendChild(projectsLabel);
  
//   projectsStat.appendChild(dbIcon);
//   projectsStat.appendChild(projectsContent);

//   // Teams stat
//   const teamsStat = document.createElement('div');
//   teamsStat.className = 'stat-item';
  
//   const globeIcon = document.createElement(GlobeIcon);
//   globeIcon.className = 'stat-item-icon';
  
//   const teamsContent = document.createElement('div');
//   teamsContent.className = 'stat-item-content';
  
//   const teamsValue = document.createElement('span');
//   teamsValue.className = 'stat-item-value';
//   teamsValue.textContent = '15';
  
//   const teamsLabel = document.createElement('span');
//   teamsLabel.className = 'stat-item-label';
//   teamsLabel.textContent = 'Teams';
  
//   teamsContent.appendChild(teamsValue);
//   teamsContent.appendChild(teamsLabel);
  
//   teamsStat.appendChild(globeIcon);
//   teamsStat.appendChild(teamsContent);

//   // Success stat
//   const successStat = document.createElement('div');
//   successStat.className = 'stat-item';
  
//   const bellIcon = document.createElement(BellIcon);
//   bellIcon.className = 'stat-item-icon';
  
//   const successContent = document.createElement('div');
//   successContent.className = 'stat-item-content';
  
//   const successValue = document.createElement('span');
//   successValue.className = 'stat-item-value';
//   successValue.textContent = '98%';
  
//   const successLabel = document.createElement('span');
//   successLabel.className = 'stat-item-label';
//   successLabel.textContent = 'Success';
  
//   successContent.appendChild(successValue);
//   successContent.appendChild(successLabel);
  
//   successStat.appendChild(bellIcon);
//   successStat.appendChild(successContent);

//   statsGrid.appendChild(projectsStat);
//   statsGrid.appendChild(teamsStat);
//   statsGrid.appendChild(successStat);
//   profileStats.appendChild(statsGrid);

//   // Profile meta
//   const profileMeta = document.createElement('div');
//   profileMeta.className = 'profile-meta';

//   // Email meta
//   const emailMeta = document.createElement('div');
//   emailMeta.className = 'meta-item';
  
//   const mailMetaIcon = document.createElement(MailIcon);
//   mailMetaIcon.className = 'meta-icon';
  
//   const emailMetaContent = document.createElement('div');
//   emailMetaContent.className = 'meta-content';
  
//   const emailLabel = document.createElement('span');
//   emailLabel.className = 'meta-label';
//   emailLabel.textContent = 'Email';
  
//   const emailValue = document.createElement('span');
//   emailValue.className = 'meta-value';
//   emailValue.textContent = user.email;
  
//   emailMetaContent.appendChild(emailLabel);
//   emailMetaContent.appendChild(emailValue);
  
//   emailMeta.appendChild(mailMetaIcon);
//   emailMeta.appendChild(emailMetaContent);

//   // Company meta
//   const companyMeta = document.createElement('div');
//   companyMeta.className = 'meta-item';
  
//   const buildingMetaIcon = document.createElement(BuildingIcon);
//   buildingMetaIcon.className = 'meta-icon';
  
//   const companyMetaContent = document.createElement('div');
//   companyMetaContent.className = 'meta-content';
  
//   const companyLabel = document.createElement('span');
//   companyLabel.className = 'meta-label';
//   companyLabel.textContent = 'Company';
  
//   const companyValue = document.createElement('span');
//   companyValue.className = 'meta-value';
//   companyValue.textContent = user.company || 'Transtelecom';
  
//   companyMetaContent.appendChild(companyLabel);
//   companyMetaContent.appendChild(companyValue);
  
//   companyMeta.appendChild(buildingMetaIcon);
//   companyMeta.appendChild(companyMetaContent);

//   // Member since meta
//   const memberMeta = document.createElement('div');
//   memberMeta.className = 'meta-item';
  
//   const clockMetaIcon = document.createElement(ClockIcon);
//   clockMetaIcon.className = 'meta-icon';
  
//   const memberMetaContent = document.createElement('div');
//   memberMetaContent.className = 'meta-content';
  
//   const memberLabel = document.createElement('span');
//   memberLabel.className = 'meta-label';
//   memberLabel.textContent = 'Member Since';
  
//   const memberValue = document.createElement('span');
//   memberValue.className = 'meta-value';
//   memberValue.textContent = new Date(user.createdAt).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
  
//   memberMetaContent.appendChild(memberLabel);
//   memberMetaContent.appendChild(memberValue);
  
//   memberMeta.appendChild(clockMetaIcon);
//   memberMeta.appendChild(memberMetaContent);

//   profileMeta.appendChild(emailMeta);
//   profileMeta.appendChild(companyMeta);
//   profileMeta.appendChild(memberMeta);

//   // Assemble profile card
//   profileCard.appendChild(profileAvatarSection);
//   profileCard.appendChild(profileStats);
//   profileCard.appendChild(profileMeta);

//   // Security card
//   const securityCard = document.createElement('div');
//   securityCard.className = 'security-card glass-card';

//   const securityCardHeader = document.createElement('div');
//   securityCardHeader.className = 'card-header';
  
//   const shieldCardIcon = document.createElement(ShieldIcon);
//   shieldCardIcon.className = 'card-icon';
  
//   const securityCardTitle = document.createElement('h3');
//   securityCardTitle.className = 'card-title';
//   securityCardTitle.textContent = 'Security Status';
  
//   const securityScore = document.createElement('div');
//   securityScore.className = 'security-score';
  
//   const scoreValue = document.createElement('span');
//   scoreValue.className = 'score-value';
//   scoreValue.textContent = '92%';
  
//   const scoreLabel = document.createElement('span');
//   scoreLabel.className = 'score-label';
//   scoreLabel.textContent = 'Secure';
  
//   securityScore.appendChild(scoreValue);
//   securityScore.appendChild(scoreLabel);
  
//   securityCardHeader.appendChild(shieldCardIcon);
//   securityCardHeader.appendChild(securityCardTitle);
//   securityCardHeader.appendChild(securityScore);

//   const securityItems = document.createElement('div');
//   securityItems.className = 'security-items';

//   // Password strength item
//   const passwordItem = document.createElement('div');
//   passwordItem.className = 'security-item secure';
  
//   const lockSecurityIcon = document.createElement(LockIcon);
//   lockSecurityIcon.className = 'security-icon';
  
//   const passwordContent = document.createElement('div');
//   passwordContent.className = 'security-content';
  
//   const passwordLabel = document.createElement('span');
//   passwordLabel.className = 'security-label';
//   passwordLabel.textContent = 'Password Strength';
  
//   const strengthMeter = document.createElement('div');
//   strengthMeter.className = 'strength-meter';
  
//   const strengthFill = document.createElement('div');
//   strengthFill.className = 'strength-fill';
//   strengthFill.style.width = '92%';
  
//   strengthMeter.appendChild(strengthFill);
  
//   passwordContent.appendChild(passwordLabel);
//   passwordContent.appendChild(strengthMeter);
  
//   passwordItem.appendChild(lockSecurityIcon);
//   passwordItem.appendChild(passwordContent);

//   // 2FA item
//   const twoFaItem = document.createElement('div');
//   twoFaItem.className = 'security-item secure';
  
//   const keySecurityIcon = document.createElement(KeyIcon);
//   keySecurityIcon.className = 'security-icon';
  
//   const twoFaContent = document.createElement('div');
//   twoFaContent.className = 'security-content';
  
//   const twoFaLabel = document.createElement('span');
//   twoFaLabel.className = 'security-label';
//   twoFaLabel.textContent = '2FA Status';
  
//   const twoFaValue = document.createElement('span');
//   twoFaValue.className = 'security-value';
//   twoFaValue.textContent = 'Enabled';
  
//   twoFaContent.appendChild(twoFaLabel);
//   twoFaContent.appendChild(twoFaValue);
  
//   twoFaItem.appendChild(keySecurityIcon);
//   twoFaItem.appendChild(twoFaContent);

//   // Last login item
//   const loginItem = document.createElement('div');
//   loginItem.className = 'security-item warning';
  
//   const networkSecurityIcon = document.createElement(NetworkIcon);
//   networkSecurityIcon.className = 'security-icon';
  
//   const loginContent = document.createElement('div');
//   loginContent.className = 'security-content';
  
//   const loginLabel = document.createElement('span');
//   loginLabel.className = 'security-label';
//   loginLabel.textContent = 'Last Login';
  
//   const loginValue = document.createElement('span');
//   loginValue.className = 'security-value';
//   loginValue.textContent = '2 hours ago';
  
//   loginContent.appendChild(loginLabel);
//   loginContent.appendChild(loginValue);
  
//   loginItem.appendChild(networkSecurityIcon);
//   loginItem.appendChild(loginContent);

//   securityItems.appendChild(passwordItem);
//   securityItems.appendChild(twoFaItem);
//   securityItems.appendChild(loginItem);

//   const securityActionBtn = document.createElement('button');
//   securityActionBtn.className = 'security-action-btn';
  
//   const settingsActionIcon = document.createElement(SettingsIcon);
//   settingsActionIcon.className = 'action-icon';
  
//   const securityActionText = document.createElement('span');
//   securityActionText.textContent = 'Security Settings';
  
//   securityActionBtn.appendChild(settingsActionIcon);
//   securityActionBtn.appendChild(securityActionText);

//   securityCard.appendChild(securityCardHeader);
//   securityCard.appendChild(securityItems);
//   securityCard.appendChild(securityActionBtn);

//   profileSidebar.appendChild(profileCard);
//   profileSidebar.appendChild(securityCard);

//   // Right Panel - Forms and Info
//   const profileContent = document.createElement('div');
//   profileContent.className = 'profile-content';

//   // Tabs
//   const profileTabs = document.createElement('div');
//   profileTabs.className = 'profile-tabs';

//   const personalTab = document.createElement('button');
//   personalTab.className = `tab-btn ${activeTab === 'personal' ? 'active' : ''}`;
//   personalTab.onclick = () => setActiveTab('personal');
  
//   const userTabIcon = document.createElement(UserIcon);
//   userTabIcon.className = 'tab-icon';
  
//   const personalTabText = document.createElement('span');
//   personalTabText.textContent = 'Personal Info';
  
//   personalTab.appendChild(userTabIcon);
//   personalTab.appendChild(personalTabText);

//   const securityTab = document.createElement('button');
//   securityTab.className = `tab-btn ${activeTab === 'security' ? 'active' : ''}`;
//   securityTab.onclick = () => setActiveTab('security');
  
//   const shieldTabIcon = document.createElement(ShieldIcon);
//   shieldTabIcon.className = 'tab-icon';
  
//   const securityTabText = document.createElement('span');
//   securityTabText.textContent = 'Security';
  
//   securityTab.appendChild(shieldTabIcon);
//   securityTab.appendChild(securityTabText);

//   const preferencesTab = document.createElement('button');
//   preferencesTab.className = `tab-btn ${activeTab === 'preferences' ? 'active' : ''}`;
//   preferencesTab.onclick = () => setActiveTab('preferences');
  
//   const settingsTabIcon = document.createElement(SettingsIcon);
//   settingsTabIcon.className = 'tab-icon';
  
//   const preferencesTabText = document.createElement('span');
//   preferencesTabText.textContent = 'Preferences';
  
//   preferencesTab.appendChild(settingsTabIcon);
//   preferencesTab.appendChild(preferencesTabText);

//   const activityTab = document.createElement('button');
//   activityTab.className = `tab-btn ${activeTab === 'activity' ? 'active' : ''}`;
//   activityTab.onclick = () => setActiveTab('activity');
  
//   const activityTabIcon = document.createElement(ActivityIcon);
//   activityTabIcon.className = 'tab-icon';
  
//   const activityTabText = document.createElement('span');
//   activityTabText.textContent = 'Activity';
  
//   activityTab.appendChild(activityTabIcon);
//   activityTab.appendChild(activityTabText);

//   profileTabs.appendChild(personalTab);
//   profileTabs.appendChild(securityTab);
//   profileTabs.appendChild(preferencesTab);
//   profileTabs.appendChild(activityTab);

//   // Messages
//   if (message.text) {
//     const messageAlert = document.createElement('div');
//     messageAlert.className = `alert alert-${message.type}`;
    
//     const alertContent = document.createElement('div');
//     alertContent.className = 'alert-content';
    
//     const alertText = document.createElement('span');
//     alertText.className = 'alert-text';
//     alertText.textContent = message.text;
    
//     alertContent.appendChild(alertText);
    
//     const alertClose = document.createElement('button');
//     alertClose.className = 'alert-close';
//     alertClose.innerHTML = '&times;';
//     alertClose.onclick = () => setMessage({ type: '', text: '' });
    
//     messageAlert.appendChild(alertContent);
//     messageAlert.appendChild(alertClose);
    
//     profileContent.appendChild(messageAlert);
//   }

//   if (error) {
//     const errorAlert = document.createElement('div');
//     errorAlert.className = 'alert alert-error';
    
//     const errorContent = document.createElement('div');
//     errorContent.className = 'alert-content';
    
//     const errorIcon = document.createElement(XCircleIcon);
//     errorIcon.className = 'alert-icon';
    
//     const errorText = document.createElement('span');
//     errorText.className = 'alert-text';
//     errorText.textContent = error;
    
//     errorContent.appendChild(errorIcon);
//     errorContent.appendChild(errorText);
    
//     const errorClose = document.createElement('button');
//     errorClose.className = 'alert-close';
//     errorClose.innerHTML = '&times;';
//     errorClose.onclick = () => setError('');
    
//     errorAlert.appendChild(errorContent);
//     errorAlert.appendChild(errorClose);
    
//     profileContent.appendChild(errorAlert);
//   }

//   // Tab content
//   const tabContent = document.createElement('div');
//   tabContent.className = 'tab-content';

//   if (activeTab === 'personal') {
//     // Personal info form card
//     const personalFormCard = document.createElement('div');
//     personalFormCard.className = 'form-card glass-card';

//     const personalFormHeader = document.createElement('div');
//     personalFormHeader.className = 'form-header';
    
//     const personalFormTitle = document.createElement('h3');
//     personalFormTitle.className = 'form-title';
//     personalFormTitle.textContent = 'Edit Personal Information';
    
//     const personalFormSubtitle = document.createElement('p');
//     personalFormSubtitle.className = 'form-subtitle';
//     personalFormSubtitle.textContent = 'Update your personal details and contact information';
    
//     personalFormHeader.appendChild(personalFormTitle);
//     personalFormHeader.appendChild(personalFormSubtitle);

//     const personalForm = document.createElement('form');
//     personalForm.className = 'profile-form';
//     personalForm.onsubmit = handleSubmit;

//     // Form rows and inputs would be created similarly...
//     // Due to length, I'm showing the structure but you'd need to create all form elements

//     const formActions = document.createElement('div');
//     formActions.className = 'form-actions';

//     const saveButton = document.createElement('button');
//     saveButton.type = 'submit';
//     saveButton.className = 'btn btn-primary save-btn';
//     saveButton.disabled = loading;
    
//     if (loading) {
//       const spinner = document.createElement('div');
//       spinner.className = 'spinner';
      
//       const savingText = document.createElement('span');
//       savingText.textContent = 'Saving...';
      
//       saveButton.appendChild(spinner);
//       saveButton.appendChild(savingText);
//     } else {
//       const saveIcon = document.createElement(SaveIcon);
//       saveIcon.className = 'btn-icon';
      
//       const saveText = document.createElement('span');
//       saveText.textContent = 'Save Changes';
      
//       saveButton.appendChild(saveIcon);
//       saveButton.appendChild(saveText);
//     }
    
//     const btnGlow = document.createElement('div');
//     btnGlow.className = 'btn-glow';
//     saveButton.appendChild(btnGlow);

//     const cancelButton = document.createElement('button');
//     cancelButton.type = 'button';
//     cancelButton.className = 'btn btn-secondary';
//     cancelButton.onclick = () => window.location.reload();
    
//     const cancelText = document.createElement('span');
//     cancelText.textContent = 'Cancel';
//     cancelButton.appendChild(cancelText);

//     formActions.appendChild(saveButton);
//     formActions.appendChild(cancelButton);

//     personalForm.appendChild(formActions);
//     personalFormCard.appendChild(personalFormHeader);
//     personalFormCard.appendChild(personalForm);
    
//     tabContent.appendChild(personalFormCard);

//     // Account information card
//     const accountInfoCard = document.createElement('div');
//     accountInfoCard.className = 'info-card glass-card';
    
//     // ... create account info content similarly

//     tabContent.appendChild(accountInfoCard);
//   } else if (activeTab === 'security') {
//     // Security tab content
//     const securityFormCard = document.createElement('div');
//     securityFormCard.className = 'form-card glass-card';

//     // ... create security form content

//     tabContent.appendChild(securityFormCard);

//     // Two-factor authentication card
//     const twoFactorCard = document.createElement('div');
//     twoFactorCard.className = 'security-card glass-card';
    
//     // ... create 2FA content

//     tabContent.appendChild(twoFactorCard);
//   }

//   profileContent.appendChild(profileTabs);
//   profileContent.appendChild(tabContent);

//   // Assemble everything
//   profileContainer.appendChild(profileSidebar);
//   profileContainer.appendChild(profileContent);

//   profilePage.appendChild(profileHeader);
//   profilePage.appendChild(profileContainer);

//   return profilePage;
// }

// export default Profile;