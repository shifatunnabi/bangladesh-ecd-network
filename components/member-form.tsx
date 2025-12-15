'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// --- TypeScript Interfaces based on Source Document ---

// Section A: General Info [cite: 1, 2, 3, 4]
interface GeneralInfo {
  organizationName: string;
  abbreviation: string;
  yearEstablished: string;
  headOfficeAddress: {
    fullAddress: string;
    upazila: string;
    district: string;
    division: string;
    contactNumber: string;
    email: string;
    website: string;
  };
  headOfOrg: {
    name: string;
    designation: string;
    contact: string;
    email: string;
    skype: string;
  };
  focalPerson: {
    name: string;
    designation: string;
    contact: string;
    email: string;
    skype: string;
  };
  orgType: 'Government' | 'Non-Government' | 'Corporation/Company' | 'UN';
  majorActivities: string[]; // [cite: 3]
  targetNeeds: string[]; // [cite: 3]
  registration: {
    authority: string[]; // [cite: 4]
    number: string;
    year: string;
  };
}

// Section B: Summary [cite: 5, 6, 7, 8, 9, 10, 11, 12]
interface SummaryInfo {
  description: string; // Mission, vision, goal
  keyActivities: string;
  targetPopulation: string;
  achievements: string;
  hasAcademicProgram: boolean;
  academicProgramDesc?: string;
  conductsResearch: boolean;
  researchDesc?: string;
  keyPartners: string;
}

// Section C: Program Details Structure (Reusable for age groups) [cite: 13-31]
interface ProgramDetails {
  hasProgram: boolean;
  programName?: string;
  targetGroup: string[]; // Rural, Urban, Slum, etc.
  duration: {
    start: string;
    end: string;
  };
  coverage: {
    districts: number;
    upazilas: number;
    districtNames: string;
  };
  parentingEducation: {
    totalParents: number;
    mothers: number;
    fathers: number;
    hasSupportGroup: boolean;
  };
  dayCare: {
    count: number;
    childrenCovered: number;
    caregiversPerCenter: number;
  };
  healthActivities: string[]; // Antenatal, Postnatal, etc.
  disabilityProgram: {
    count: number;
    activities: string;
  };
}

// Master Form Interface
interface MembershipFormInputs {
  sectionA: GeneralInfo;
  sectionB: SummaryInfo;
  // Breaking down Section C by age groups found in source 
  program0to3: ProgramDetails; 
  program3to5: ProgramDetails;
  program5to6: ProgramDetails;
  program6to8: ProgramDetails;
  // Section D
  training: {
    hasOwnSystem: boolean;
    trainers: {
      total: number;
      male: number;
      female: number;
    }
  };
  // Section E [cite: 34, 35, 36]
  reasonsForJoining: {
    motivation: string;
    jointActivities: string;
    contribution: string;
  };
  // Section F
  respondent: {
    name: string;
    designation: string;
    date: string;
  };
}

export default function BENMembershipForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<MembershipFormInputs>();
  
  const onSubmit: SubmitHandler<MembershipFormInputs> = (data) => {
    console.log('Form Data:', data);
    alert("Form submitted! Check console for JSON.");
  };

  // Watchers for conditional rendering
  const watchOrgType = watch("sectionA.orgType");
  const watchHasProgram03 = watch("program0to3.hasProgram");
  const watchHasProgram35 = watch("program3to5.hasProgram");

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-lg my-10">
      <div className="text-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Bangladesh ECD Network (BEN) Membership Form</h1>
        <p className="text-sm text-gray-600">Based on BEN Membership Form-2025 [cite: 1]</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* --- SECTION A: General Information --- */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Section A: General Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name of Organization</label>
              <input {...register("sectionA.organizationName")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Abbreviation (if available)</label>
              <input {...register("sectionA.abbreviation")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year of Establishment </label>
              <input type="number" {...register("sectionA.yearEstablished")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type of Organization</label>
              <select {...register("sectionA.orgType")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                <option value="Government">Government</option>
                <option value="Non-Government">Non-Government (Local/National/Intl)</option>
                <option value="Corporation/Company">Corporation/Company</option>
                <option value="UN">UN</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-gray-700 mb-2">Address of Head Office</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <input placeholder="Full Address" {...register("sectionA.headOfficeAddress.fullAddress")} className="col-span-2 rounded-md border-gray-300 shadow-sm p-2 border" />
               <input placeholder="Upazila" {...register("sectionA.headOfficeAddress.upazila")} className="rounded-md border-gray-300 shadow-sm p-2 border" />
               <input placeholder="District" {...register("sectionA.headOfficeAddress.district")} className="rounded-md border-gray-300 shadow-sm p-2 border" />
               <input placeholder="Division" {...register("sectionA.headOfficeAddress.division")} className="rounded-md border-gray-300 shadow-sm p-2 border" />
               <input placeholder="Website" {...register("sectionA.headOfficeAddress.website")} className="rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-gray-700 mb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <input placeholder="Contact Number" type="tel" {...register("sectionA.headOfficeAddress.contactNumber")} className="rounded-md border-gray-300 shadow-sm p-2 border" />
               <input placeholder="Email Address" type="email" {...register("sectionA.headOfficeAddress.email")} className="rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
          </div>

          <div className="mt-4">
             <label className="block text-sm font-medium text-gray-700 mb-2">Registration Authority [cite: 4]</label>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {['Department of Social Services', 'NGO Affairs Bureau', 'Directorate of Women Affairs', 'Joint Stock Company'].map((auth) => (
                  <label key={auth} className="flex items-center space-x-2">
                    <input type="checkbox" value={auth} {...register("sectionA.registration.authority")} />
                    <span>{auth}</span>
                  </label>
                ))}
             </div>
          </div>
        </section>

        {/* --- SECTION B: Summary Information --- */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Section B: Summary Information [cite: 5-12]</h2>
          <p className="text-sm text-gray-500 mb-4">Please answer based on your Organization Type: <strong>{watchOrgType}</strong></p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Brief Description (Mission, Vision, Goal) </label>
              <textarea {...register("sectionB.description")} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Key Target Population Served [cite: 5, 7, 11]</label>
              <input {...register("sectionB.targetPopulation")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" placeholder="e.g. children by age group, parents, community" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Key Achievements (Last 5 Years) [cite: 5, 7]</label>
              <textarea {...register("sectionB.achievements")} rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700">Does your org have an academic program on ECD? [cite: 6]</label>
                  <select {...register("sectionB.hasAcademicProgram")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">Does your org conduct research on ECD? [cite: 6]</label>
                  <select {...register("sectionB.conductsResearch")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
               </div>
            </div>
          </div>
        </section>

        {/* --- SECTION C: Program Details (Example: 0-3 Years) --- */}
        {/* Note: In a real app, you would create a reusable component for this section to repeat for 3-5, 5-6, 6-8  */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Section C: Program Details (0-3 Years) [cite: 13]</h2>
          
          <label className="flex items-center space-x-3 mb-4">
             <input type="checkbox" {...register("program0to3.hasProgram")} className="h-5 w-5 text-indigo-600" />
             <span className="font-medium text-gray-900">Do you have a program for 0-3 year old children?</span>
          </label>

          {watchHasProgram03 && (
            <div className="space-y-6 border-l-4 border-indigo-200 pl-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name of Program [cite: 13]</label>
                    <input {...register("program0to3.programName")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Target Group [cite: 14]</label>
                    <div className="flex flex-wrap gap-2 text-sm mt-2">
                       {['Rural', 'Urban', 'Slum', 'Ethnic', 'Street Children', 'Disability'].map((t) => (
                         <label key={t} className="flex items-center space-x-1">
                            <input type="checkbox" value={t} {...register("program0to3.targetGroup")} />
                            <span>{t}</span>
                         </label>
                       ))}
                    </div>
                  </div>
               </div>

               <div>
                 <h4 className="font-medium text-gray-700 mb-2">Health Activities [cite: 16]</h4>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    {['Antenatal care', 'Postnatal care', 'Hygiene', 'Mental health', 'Safety'].map((act) => (
                      <label key={act} className="flex items-center space-x-2">
                        <input type="checkbox" value={act} {...register("program0to3.healthActivities")} />
                        <span>{act}</span>
                      </label>
                    ))}
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded border">
                  <div>
                    <h5 className="font-medium text-gray-700">Day Care Info [cite: 16]</h5>
                    <label className="text-xs">Number of centers</label>
                    <input type="number" {...register("program0to3.dayCare.count")} className="block w-full border p-1 rounded" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700">&nbsp;</h5>
                    <label className="text-xs">Children Covered</label>
                    <input type="number" {...register("program0to3.dayCare.childrenCovered")} className="block w-full border p-1 rounded" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700">&nbsp;</h5>
                    <label className="text-xs">Caregivers per center</label>
                    <input type="number" {...register("program0to3.dayCare.caregiversPerCenter")} className="block w-full border p-1 rounded" />
                  </div>
               </div>
            </div>
          )}
        </section>

         {/* --- SECTION C: Program Details (3-5 Years) - Simplified for brevity --- */}
         <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Section C: Program Details (3-5 Years) [cite: 17]</h2>
          <label className="flex items-center space-x-3 mb-4">
             <input type="checkbox" {...register("program3to5.hasProgram")} className="h-5 w-5 text-indigo-600" />
             <span className="font-medium text-gray-900">Do you have a program for 3-5 year old children?</span>
          </label>
          {watchHasProgram35 && (
             <div className="p-4 bg-indigo-50 text-sm text-indigo-800 rounded">
                * Fields similar to 0-3 years would appear here in the full implementation. 
                Refer to [cite: 18, 19, 20] for specific fields like Early Learning Centers.
             </div>
          )}
        </section>

        {/* --- SECTION E: Motivation [cite: 34, 35, 36] --- */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Section E: Reasons for Applying</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Why does your organization want to become a member of BEN? [cite: 34]</label>
              <textarea {...register("reasonsForJoining.motivation")} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">What joint activities do you envision collaborating with BEN? [cite: 35]</label>
              <textarea {...register("reasonsForJoining.jointActivities")} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" placeholder="Proposed activities, expected outcomes, time frame" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contribution your organization can provide [cite: 36]</label>
              <textarea {...register("reasonsForJoining.contribution")} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" placeholder="Manpower, technical expertise, funding, etc." />
            </div>
          </div>
        </section>

        {/* --- SECTION F: Respondent Info --- */}
        <section className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Respondent's Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input placeholder="Name" {...register("respondent.name")} className="rounded-md border-gray-300 shadow-sm p-2 border" />
             <input placeholder="Designation" {...register("respondent.designation")} className="rounded-md border-gray-300 shadow-sm p-2 border" />
             <input type="date" {...register("respondent.date")} className="rounded-md border-gray-300 shadow-sm p-2 border" />
          </div>
        </section>

        <div className="flex justify-end">
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200">
            Submit Application
          </button>
        </div>

      </form>
    </div>
  );
}