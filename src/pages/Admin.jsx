import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MEDITATION_DATES } from '../constants/meditation_data';
import AlertModal from '../components/common/AlertModal';

const Admin = () => {
  const [data, setData] = useState({ ...MEDITATION_DATES });
  const [date, setDate] = useState('');
  const [links, setLinks] = useState({
    ko: '',
    en: '',
    zh: '',
    es: '',
    pt: '',
    tl: ''
  });
  
  const [editingDate, setEditingDate] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (lang, value) => {
    setLinks(prev => ({
      ...prev,
      [lang]: value
    }));
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!date) {
      setAlertMessage('날짜를 입력해주세요.');
      return;
    }

    // 일요일 요일 검증 (0: 일요일)
    const [year, month, dayVal] = date.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, dayVal);
    if (selectedDate.getDay() !== 0) {
      setAlertMessage('발행일은 일요일 날짜만 선택할 수 있습니다. 올바른 일요일 날짜를 선택해주세요.');
      return;
    }

    // 간단한 구글 드라이브 링크 등 URL 검증 (선택적)
    const emptyLinks = Object.values(links).every(link => !link.trim());
    if (emptyLinks) {
      setAlertMessage('적어도 하나의 언어 링크는 입력해야 합니다.');
      return;
    }

    setData(prev => ({
      ...prev,
      [date]: { ...links }
    }));

    // Reset Form
    setDate('');
    setLinks({ ko: '', en: '', zh: '', es: '', pt: '', tl: '' });
    setEditingDate(null);
    setAlertMessage(editingDate ? '목록에 수정 내용이 반영되었습니다. 파일에 최종 기록하려면 아래의 [변경사항 저장하기] 버튼을 눌러주세요.' : '목록에 추가되었습니다. 파일에 최종 기록하려면 아래의 [변경사항 저장하기] 버튼을 눌러주세요.');
  };

  const handleEdit = (targetDate) => {
    setEditingDate(targetDate);
    setDate(targetDate);
    setLinks({
      ko: data[targetDate].ko || '',
      en: data[targetDate].en || '',
      zh: data[targetDate].zh || '',
      es: data[targetDate].es || '',
      pt: data[targetDate].pt || '',
      tl: data[targetDate].tl || ''
    });
  };

  const handleDelete = (targetDate) => {
    if (window.confirm(`${targetDate} 묵상 데이터를 삭제하시겠습니까?`)) {
      const updated = { ...data };
      delete updated[targetDate];
      setData(updated);
      setAlertMessage('목록에서 삭제되었습니다. 변경사항을 저장하려면 아래 [변경사항 저장하기] 버튼을 눌러주세요.');
    }
  };

  const handleSaveToFile = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-meditation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(`서버 응답 파싱 실패 (응답 내용: ${responseText || '없음'})`);
      }

      if (response.ok && result.success) {
        setAlertMessage('성공적으로 meditation_data.js 파일에 저장되었습니다!');
      } else {
        setAlertMessage(`저장 실패: ${result.error || '서버 오류 발생'}`);
      }
    } catch (error) {
      setAlertMessage(`오류 발생: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="admin-page" style={{ backgroundColor: 'var(--off-white)', minHeight: '100vh', padding: '120px 0 60px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 className="section-title" style={{ textAlign: 'left', margin: 0, fontSize: '2.5rem' }}>묵상자료 관리자</h1>
            <p style={{ opacity: 0.7, marginTop: '0.5rem' }}>날짜별 묵상 PDF 다운로드 링크를 6개 국어별로 관리할 수 있는 도구입니다.</p>
          </div>
          <Link to="/meditation" className="secondary-btn" style={{ padding: '0.8rem 1.5rem', textDecoration: 'none' }}>
            묵상 페이지 보기
          </Link>
        </div>

        <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* 1. 추가 / 수정 폼 */}
          <div className="admin-card" style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(17, 42, 34, 0.05)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--dark-green)', marginBottom: '1.5rem', borderBottom: '1px solid #eaeaea', paddingBottom: '1rem' }}>
              {editingDate ? '묵상자료 수정' : '새 묵상자료 등록'}
            </h3>
            
            <form onSubmit={handleAddOrUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '500', color: 'var(--dark-green)' }}>발행일 (일요일 추천)</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  disabled={!!editingDate}
                  style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                  required 
                />
              </div>

              {['ko', 'en', 'zh', 'es', 'pt', 'tl'].map(lang => {
                const langLabels = {
                  ko: '한국어 (KO) 구글 드라이브 링크',
                  en: '영어 (EN) 구글 드라이브 링크',
                  zh: '중국어 (ZH) 구글 드라이브 링크',
                  es: '스페인어 (ES) 구글 드라이브 링크',
                  pt: '포르투갈어 (PT) 구글 드라이브 링크',
                  tl: '타갈로그어 (TL) 구글 드라이브 링크'
                };
                return (
                  <div key={lang} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem', color: 'var(--dark-green)' }}>{langLabels[lang]}</label>
                    <input 
                      type="url" 
                      placeholder="https://drive.google.com/file/d/.../view" 
                      value={links[lang]} 
                      onChange={(e) => handleInputChange(lang, e.target.value)}
                      style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                  </div>
                );
              })}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="primary-btn" style={{ flex: 1, padding: '1rem', border: 'none', cursor: 'pointer' }}>
                  {editingDate ? '수정 내용 적용' : '목록에 추가'}
                </button>
                {editingDate && (
                  <button 
                    type="button" 
                    className="secondary-btn" 
                    onClick={() => {
                      setEditingDate(null);
                      setDate('');
                      setLinks({ ko: '', en: '', zh: '', es: '', pt: '', tl: '' });
                    }}
                    style={{ padding: '1rem' }}
                  >
                    취소
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* 2. 현재 목록 및 저장 버튼 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="admin-card" style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(17, 42, 34, 0.05)', maxHeight: '600px', overflowY: 'auto' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--dark-green)', marginBottom: '1.5rem', borderBottom: '1px solid #eaeaea', paddingBottom: '1rem' }}>
                현재 등록된 목록 ({Object.keys(data).length}개)
              </h3>
              
              {Object.keys(data).length === 0 ? (
                <p style={{ textAlign: 'center', opacity: 0.5, padding: '3rem 0' }}>등록된 묵상이 없습니다. 왼쪽에서 새 묵상을 등록해 주세요.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {Object.keys(data).sort((a, b) => b.localeCompare(a)).map(itemDate => (
                    <div 
                      key={itemDate} 
                      style={{ 
                        padding: '1.2rem', 
                        borderRadius: '10px', 
                        border: '1px solid #f0f0f0', 
                        backgroundColor: '#fafaf9', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '1.1rem', color: 'var(--dark-green)' }}>{itemDate}</strong>
                        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                          {Object.keys(data[itemDate]).map(lang => {
                            const link = data[itemDate][lang];
                            const hasLink = !!link;
                            return (
                              <span 
                                key={lang} 
                                onClick={() => hasLink && window.open(link, '_blank')}
                                title={hasLink ? `${lang.toUpperCase()} 링크 열기: ${link}` : `${lang.toUpperCase()} 링크 없음`}
                                style={{ 
                                  fontSize: '0.75rem', 
                                  padding: '2px 6px', 
                                  borderRadius: '4px', 
                                  backgroundColor: hasLink ? '#e2ebd5' : '#f0f0f0', 
                                  color: hasLink ? '#3b5c1c' : '#999',
                                  textTransform: 'uppercase',
                                  fontWeight: 'bold',
                                  cursor: hasLink ? 'pointer' : 'default',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  if (hasLink) {
                                    e.currentTarget.style.backgroundColor = '#cce0b0';
                                    e.currentTarget.style.color = '#273f11';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (hasLink) {
                                    e.currentTarget.style.backgroundColor = '#e2ebd5';
                                    e.currentTarget.style.color = '#3b5c1c';
                                  }
                                }}
                              >
                                {lang}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          className="secondary-btn" 
                          onClick={() => handleEdit(itemDate)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        >
                          수정
                        </button>
                        <button 
                          onClick={() => handleDelete(itemDate)}
                          style={{ 
                            padding: '0.4rem 0.8rem', 
                            fontSize: '0.85rem', 
                            backgroundColor: '#fee2e2', 
                            color: '#ef4444', 
                            border: 'none', 
                            borderRadius: '6px', 
                            cursor: 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 최종 저장 버튼 */}
            <button 
              onClick={handleSaveToFile} 
              className="primary-btn" 
              disabled={isSaving}
              style={{ 
                width: '100%', 
                padding: '1.2rem', 
                fontSize: '1.2rem', 
                fontWeight: '600', 
                border: 'none', 
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(17, 42, 34, 0.15)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isSaving ? '저장 중...' : '💾 변경사항 저장하기 (meditation_data.js)'}
            </button>
          </div>
        </div>
      </div>

      <AlertModal 
        isOpen={!!alertMessage} 
        message={alertMessage} 
        onClose={() => setAlertMessage('')} 
      />
    </main>
  );
};

export default Admin;
