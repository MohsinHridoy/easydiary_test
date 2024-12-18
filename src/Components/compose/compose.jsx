import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEntries } from '../EntryContext/EntryContext';

const ComposePage = () => {
  const [formData, setFormData] = useState({
    subjectDescription: '',
    advisorDepartment: '',
    seniorSecretaryDepartment: '',
    additionalSecretaryLawSubsection: '',
    jointSecretaryLawBranch: '',
    additionalSecretaryDisciplineSubsection: '',
    jointSecretaryDisciplineBranch: '',
    lawSections: '',
    disciplineSections: '',
    recommendationComments: '',
    diaryNumber: '',
    internalDepartment: '',
    externalDepartment: '',
    signatureSeal: ''
  });

  const navigate = useNavigate();
  const { addEntry } = useEntries();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation to ensure all required fields are filled
    if (!formData.subjectDescription || !formData.advisorDepartment) {
      alert("কিছু ফিল্ড খালি রয়েছে, দয়া করে সমস্ত তথ্য পূর্ণ করুন।");
      return;
    }

    // Add the entry and clear the form
    addEntry(formData);

    // Reset form data
    setFormData({
      subjectDescription: '',
      advisorDepartment: '',
      seniorSecretaryDepartment: '',
      additionalSecretaryLawSubsection: '',
      jointSecretaryLawBranch: '',
      additionalSecretaryDisciplineSubsection: '',
      jointSecretaryDisciplineBranch: '',
      lawSections: '',
      disciplineSections: '',
      recommendationComments: '',
      diaryNumber: '',
      internalDepartment: '',
      externalDepartment: '',
      signatureSeal: ''
    });

    // Navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">এন্ট্রি তৈরি করুন</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Subject Description and Advisor Department */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">বিষয়/বিবরণ:</label>
            <input
              type="text"
              name="subjectDescription"
              value={formData.subjectDescription}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="বিষয় বা বিবরণ লিখুন"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">উপদেষ্টার দপ্তর:</label>
            <input
              type="text"
              name="advisorDepartment"
              value={formData.advisorDepartment}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="উপদেষ্টার দপ্তর লিখুন"
            />
          </div>
        </div>

        {/* Row 2: Senior Secretary Department and Additional Secretary Law Subsection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">সিনিয়র সচিবের দপ্তর:</label>
            <input
              type="text"
              name="seniorSecretaryDepartment"
              value={formData.seniorSecretaryDepartment}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="সিনিয়র সচিবের দপ্তর লিখুন"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">অতিঃ সচিব (আইন) অনুবিভাগ:</label>
            <input
              type="text"
              name="additionalSecretaryLawSubsection"
              value={formData.additionalSecretaryLawSubsection}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="অতিঃ সচিব (আইন) অনুবিভাগ লিখুন"
            />
          </div>
        </div>

        {/* Row 3: Joint Secretary Law Branch and Additional Secretary Discipline Subsection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">যুগ্ন সচিব (আইন) অধিশাখা:</label>
            <input
              type="text"
              name="jointSecretaryLawBranch"
              value={formData.jointSecretaryLawBranch}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="যুগ্ন সচিব (আইন) অধিশাখা লিখুন"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">অতিঃ সচিব (শৃংখলা) অনুবিভাগ:</label>
            <input
              type="text"
              name="additionalSecretaryDisciplineSubsection"
              value={formData.additionalSecretaryDisciplineSubsection}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="অতিঃ সচিব (শৃংখলা) অনুবিভাগ লিখুন"
            />
          </div>
        </div>

        {/* Row 4: Joint Secretary Discipline Branch and Law Sections */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">যুগ্ন সচিব (শৃংখলা) অধিশাখা:</label>
            <input
              type="text"
              name="jointSecretaryDisciplineBranch"
              value={formData.jointSecretaryDisciplineBranch}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="যুগ্ন সচিব (শৃংখলা) অধিশাখা লিখুন"
            />
          </div>
          <div className='flex gap-4 items-center justify-center'>
            <div className='w-2/3'>
              <label className="block text-sm font-medium mb-2">আইন শাখা:</label>
              <input
                type="text"
                name="lawSections"
                value={formData.lawSections}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                placeholder="আইন শাখা লিখুন"
              />
            </div>
            <div className="dropdown w-1/3">
            <label className="block text-sm font-medium mb-2">শাখা:</label>
                <div tabIndex={0} role="button" className="btn m-1">Select</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li><a>১</a></li>
                  <li><a>২</a></li>
                  <li><a>৩</a></li>
                  <li><a>৪</a></li>
                  
                </ul>
              </div>
          </div>
        </div>

        {/* Row 5: Discipline Sections and Recommendation / Comments */}
        <div className="grid grid-cols-2 gap-4">
          <div className='flex gap-4 items-center justify-center '>
            <div className='w-2/3'>
            <label className="block text-sm font-medium mb-2">শৃংখলা শাখা:</label>
            <input
              type="text"
              name="disciplineSections"
              value={formData.disciplineSections}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="শৃংখলা শাখা লিখুন"
            />
            </div>
            <div className="dropdown w-1/3">
            <label className="block text-sm font-medium mb-2">শাখা:</label>
                <div tabIndex={0} role="button" className="btn m-1">Select</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li><a>১</a></li>
                  <li><a>২</a></li>
                  <li><a>৩</a></li>
                  <li><a>৪</a></li>
                  
                </ul>
              </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">সুপারিশ/মন্তব্য:</label>
            <textarea
              name="recommendationComments"
              value={formData.recommendationComments}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="সুপারিশ বা মন্তব্য লিখুন"
            />
          </div>
        </div>

        {/* Row 6: Diary Number and Internal Department */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">ডায়েরি নং:</label>
            <input
              type="text"
              name="diaryNumber"
              value={formData.diaryNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="ডায়েরি নং লিখুন"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">বিবিধ/অভ্যন্তরীণ দপ্তর:</label>
            <input
              type="text"
              name="internalDepartment"
              value={formData.internalDepartment}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="বিবিধ/অভ্যন্তরীণ দপ্তর লিখুন"
            />
          </div>
        </div>

        {/* Row 7: External Department and Signature Seal */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">বিবিধ/বহিস্থ দপ্তর:</label>
            <input
              type="text"
              name="externalDepartment"
              value={formData.externalDepartment}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="বিবিধ/বহিস্থ দপ্তর লিখুন"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">স্বাক্ষর/সীল:</label>
            <input
              type="text"
              name="signatureSeal"
              value={formData.signatureSeal}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="স্বাক্ষর বা সীল লিখুন"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            এন্ট্রি তৈরি করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposePage;
