'use client';

import React, { useState, useRef } from 'react';
import { Camera, User } from 'lucide-react';
import styles from './page.module.css';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    email: ''
  });
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarPlaceholder}>
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className={styles.avatarImg} />
              ) : (
                <User size={48} />
              )}
            </div>
            <label htmlFor="avatar-upload" className={styles.editAvatarBtn}>
              <Camera size={18} />
            </label>
            <input 
              type="file" 
              id="avatar-upload" 
              hidden 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
          <h2 className={styles.profileTitle}>Edit Profile</h2>
          <p className={styles.profileSubtitle}>Update your personal information</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.row}>
            <div>
              <label className={styles.formLabel}>First Name</label>
              <input 
                type="text" 
                name="firstName"
                className={styles.formControl} 
                placeholder="John" 
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={styles.formLabel}>Last Name</label>
              <input 
                type="text" 
                name="lastName"
                className={styles.formControl} 
                placeholder="Doe" 
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.formLabel}>Nickname</label>
            <input 
              type="text" 
              name="nickname"
              className={styles.formControl} 
              placeholder="@johndoe" 
              onChange={handleChange}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.formLabel}>Email Address</label>
            <input 
              type="email" 
              name="email"
              className={styles.formControl} 
              placeholder="john@example.com" 
              onChange={handleChange}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.btnSave}>Save Changes</button>
            <button type="button" className={styles.btnCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}