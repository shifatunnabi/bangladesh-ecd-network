'use client';

import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';

// Type definitions based on the form structure
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
  headOfOrganization: {
    name: string;
    designation: string;
    contactNumber: string;
    email: string;
    skypeId: string;
  };
  focalPersonECD: {
    name: string;
    designation: string;
    contactNumber: string;
    email: string;
    skypeId: string;
  };
  organizationType: 'Government' | 'NonGovernment' | 'CorporationCompany' | 'UN' | '';
  majorActivities: string[];
  targetNeeds: string[];
  registration: {
    authority: string[];
    registrationNumber: string;
    yearOfRegistration: string;
  };
}

interface ProgramInfo {
  hasProgram: boolean;
  programName?: string;
  targetGroup?: string[];
  startDate?: string;
  endDate?: string;
  numberOfDistricts?: string;
  numberOfUpazilas?: string;
  districtName?: string;
  upazilaName?: string;
  parentingEducation?: {
    totalParents?: string;
    mothers?: string;
    fathers?: string;
    hasSupportGroup?: boolean;
    supportGroupBreakdown?: {
      total?: string;
      mothers?: string;
      fathers?: string;
      adolescent?: string;
      others?: string;
    };
  };
  dayCareCenter?: {
    number?: string;
    childrenCovered?: string;
    caregiversPerCenter?: string;
  };
  healthAndNutrition?: {
    hasActivities?: boolean;
    activities?: string[];
  };
  earlyLearningCenter?: {
    homeBasedCenters?: string;
    centerBasedCenters?: string;
    childrenCovered?: string;
    teachersPerCenter?: string;
  };
  prerimaryEducation?: {
    totalCenters?: string;
    childrenCovered?: string;
    teachersPerSchool?: string;
    ownPlace?: string;
    rentedHouse?: string;
    govSchool?: string;
  };
  supportProgramEarlyGrades?: {
    hasProgram?: boolean;
    description?: string;
  };
  disabilityProgram?: {
    childrenCovered?: string;
    activities?: string;
  };
  otherActivities?: {
    hasOther?: boolean;
    description?: string;
  };
}

interface MembershipFormData {
  sectionA: GeneralInfo;
  program0to3: ProgramInfo;
  program3to5: ProgramInfo;
  program5to6: ProgramInfo;
  program6to8: ProgramInfo;
  sectionB: {
    briefDescription: string;
    keyActivities: string;
    scopeOfWork?: string;
    keyTargetPopulation: string;
    keyAchievements: string;
    academicProgram: {
      hasProgram: boolean;
      description?: string;
    };
    researchActivities: {
      hasProgram: boolean;
      description?: string;
    };
    corporateSocialResponsibility?: string;
    productsForChildren?: string;
    keyPartners: string;
  };
  sectionD: {
    training: {
      hasOwnSystem: boolean;
      trainers0to3?: boolean;
      trainers3to5?: boolean;
      trainers5to6?: boolean;
      trainers6to8?: boolean;
      totalTrainers?: {
        total?: string;
        male?: string;
        female?: string;
      };
    };
    supervisionAndMonitoring: {
      hasOwnSystem: boolean;
      numberOfSupervisors?: string;
    };
    funding: string[];
    implementingPartner: {
      implementationType: 'Own' | 'Partner' | '';
      partnerNames?: string;
    };
  };
  sectionE: {
    motivation: string;
    jointActivities: string;
    contribution: string;
  };
  sectionF: {
    name: string;
    designation: string;
    organization: string;
    contactNumber: string;
    email: string;
    skypeId: string;
    dateOfSubmission: string;
  };
}

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CollapsibleSection({ title, isOpen, onToggle, children }: CollapsibleSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="p-6 bg-white">{children}</div>}
    </div>
  );
}

interface FormInputProps {
  label: string;
  placeholder?: string;
  register: any;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}

function FormInput({ label, placeholder, register, name, type = 'text', required = false, className = '' }: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      />
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  register: any;
  name: string;
  rows?: number;
  required?: boolean;
}

function FormTextarea({ label, placeholder, register, name, rows = 3, required = false }: FormTextareaProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        {...register(name, { required })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

interface FormSelectProps {
  label: string;
  options: { value: string; label: string }[];
  register: any;
  name: string;
  required?: boolean;
}

function FormSelect({ label, options, register, name, required = false }: FormSelectProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name, { required })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface FormCheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  register: any;
  name: string;
}

function FormCheckboxGroup({ label, options, register, name }: FormCheckboxGroupProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              value={option.value}
              {...register(name)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface FormRadioGroupProps {
  label: string;
  options: { value: string; label: string }[];
  register: any;
  name: string;
}

function FormRadioGroup({ label, options, register, name }: FormRadioGroupProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              className="h-4 w-4 text-indigo-600 border-gray-300"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function BENMembershipForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<MembershipFormData>({
    defaultValues: {
      sectionA: {
        majorActivities: [],
        targetNeeds: [],
        registration: {
          authority: [],
        },
      },
    },
  });

  const [openSections, setOpenSections] = useState<string[]>(['sectionA']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const organizationType = watch('sectionA.organizationType');
  const hasProgram0to3 = watch('program0to3.hasProgram');
  const hasProgram3to5 = watch('program3to5.hasProgram');
  const hasProgram5to6 = watch('program5to6.hasProgram');
  const hasProgram6to8 = watch('program6to8.hasProgram');

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const onSubmit: SubmitHandler<MembershipFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitResult(null);

      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitResult({
          success: true,
          message: result.message || 'Your application has been submitted successfully! You will receive an email once it has been reviewed.'
        });
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Failed to submit application. Please try again.'
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'An error occurred while submitting your application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white my-10">
      <div className="text-center mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bangladesh ECD Network (BEN) (BEN) Membership Form</h1>
        <p className="text-gray-600 mt-2">
          Secretariat: BRAC Institute of Educational Development (BRAC IED)<br />
          House # 113, Road # 2, Block # A, Niketan, Gulshan 1, Dhaka 1212
        </p>
      </div>

      {/* Success/Error Message */}
      {submitResult && (
        <div className={`p-4 rounded-lg mb-6 ${submitResult.success
          ? 'bg-green-50 border border-green-200 text-green-800'
          : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
          <p className="font-medium">{submitResult.success ? '✅ Success!' : '❌ Error'}</p>
          <p className="mt-1">{submitResult.message}</p>
        </div>
      )}

      {!submitResult?.success && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* SECTION A: General Information */}
          <CollapsibleSection
            title="Section A: General Information"
            isOpen={openSections.includes('sectionA')}
            onToggle={() => toggleSection('sectionA')}
          >
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Name of Organization" name="sectionA.organizationName" register={register} required />
                <FormInput label="Abbreviation/Short Name" name="sectionA.abbreviation" register={register} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Year of Establishment" name="sectionA.yearEstablished" register={register} type="number" />
                <FormSelect
                  label="Type of Organization"
                  name="sectionA.organizationType"
                  register={register}
                  required
                  options={[
                    { value: 'Government', label: 'Government' },
                    { value: 'NonGovernment', label: 'Non-Government (Local/National/International)' },
                    { value: 'CorporationCompany', label: 'Corporation/Company' },
                    { value: 'UN', label: 'UN' },
                  ]}
                />
              </div>

              {/* Head Office Address */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Address of Head Office</h3>
                <div className="space-y-3">
                  <FormInput label="Full Address" name="sectionA.headOfficeAddress.fullAddress" register={register} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput label="Upazila" name="sectionA.headOfficeAddress.upazila" register={register} />
                    <FormInput label="District" name="sectionA.headOfficeAddress.district" register={register} />
                    <FormInput label="Division" name="sectionA.headOfficeAddress.division" register={register} />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput label="Contact Number" name="sectionA.headOfficeAddress.contactNumber" register={register} type="tel" />
                  <FormInput label="Email" name="sectionA.headOfficeAddress.email" register={register} type="email" />
                  <FormInput label="Website" name="sectionA.headOfficeAddress.website" register={register} />
                </div>
              </div>

              {/* Head of Organization */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Head of the Organization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput label="Name" name="sectionA.headOfOrganization.name" register={register} />
                  <FormInput label="Designation" name="sectionA.headOfOrganization.designation" register={register} />
                  <FormInput label="Contact Number" name="sectionA.headOfOrganization.contactNumber" register={register} type="tel" />
                  <FormInput label="Email" name="sectionA.headOfOrganization.email" register={register} type="email" />
                  <FormInput label="Skype ID" name="sectionA.headOfOrganization.skypeId" register={register} />
                </div>
              </div>

              {/* Focal Person */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Focal Person for ECD</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput label="Name" name="sectionA.focalPersonECD.name" register={register} />
                  <FormInput label="Designation" name="sectionA.focalPersonECD.designation" register={register} />
                  <FormInput label="Contact Number" name="sectionA.focalPersonECD.contactNumber" register={register} type="tel" />
                  <FormInput label="Email" name="sectionA.focalPersonECD.email" register={register} type="email" />
                  <FormInput label="Skype ID" name="sectionA.focalPersonECD.skypeId" register={register} />
                </div>
              </div>

              {/* Major Activities */}
              <div className="border-t pt-4">
                <FormCheckboxGroup
                  label="Major Activities in ECD (Select one or more)"
                  name="sectionA.majorActivities"
                  register={register}
                  options={[
                    { value: 'providingServices', label: 'Providing services for young children' },
                    { value: 'training', label: 'Training/Capacity development' },
                    { value: 'academicProgram', label: 'Academic program/course' },
                    { value: 'research', label: 'Research' },
                    { value: 'advocacy', label: 'Advocacy and networking' },
                    { value: 'materialDevelopment', label: 'Material development' },
                    { value: 'others', label: 'Others' },
                  ]}
                />
              </div>

              {/* Target Needs */}
              <div className="border-t pt-4">
                <FormCheckboxGroup
                  label="Organization is mainly concerned with the needs of"
                  name="sectionA.targetNeeds"
                  register={register}
                  options={[
                    { value: 'youngChildren', label: 'Only young children (below 8 years)' },
                    { value: 'childrenAbove8', label: 'Children (8+ to 18)' },
                    { value: 'families', label: 'Families' },
                    { value: 'womenAndChildren', label: 'Women and children' },
                    { value: 'others', label: 'Others' },
                  ]}
                />
              </div>

              {/* Registration */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Registration Information</h3>
                <div className="space-y-4">
                  <FormCheckboxGroup
                    label="Authority under which your organization is registered"
                    name="sectionA.registration.authority"
                    register={register}
                    options={[
                      { value: 'socialServices', label: 'Department of Social Services' },
                      { value: 'ngoAffairs', label: 'NGO Affairs Bureau' },
                      { value: 'womenAffairs', label: 'Directorate of Women Affairs' },
                      { value: 'familyPlanning', label: 'Directorate General of Family Planning' },
                      { value: 'youthDevelopment', label: 'Department of Youth Development' },
                      { value: 'jointStock', label: 'Joint Stock Company' },
                      { value: 'others', label: 'Others' },
                      { value: 'notApplicable', label: 'Not applicable' },
                    ]}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Registration Number" name="sectionA.registration.registrationNumber" register={register} />
                    <FormInput label="Year of Registration" name="sectionA.registration.yearOfRegistration" register={register} type="number" />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* SECTION B: Summary Information */}
          <CollapsibleSection
            title="Section B: Summary Information"
            isOpen={openSections.includes('sectionB')}
            onToggle={() => toggleSection('sectionB')}
          >
            <div className="space-y-6">
              <FormTextarea label="Brief Description (Mission, Vision, Goal, Objectives)" name="sectionB.briefDescription" register={register} rows={4} />
              <FormTextarea label="Key Activities" name="sectionB.keyActivities" register={register} rows={3} />
              <FormTextarea label="Key Target Population Served" name="sectionB.keyTargetPopulation" register={register} rows={3} />
              <FormTextarea label="Key Achievements (Last 5 Years)" name="sectionB.keyAchievements" register={register} rows={3} />
              <FormTextarea label="Key Partners (Who do you work with?)" name="sectionB.keyPartners" register={register} rows={3} />

              {organizationType === 'CorporationCompany' && (
                <>
                  <FormTextarea label="Corporate Social Responsibility Goals" name="sectionB.corporateSocialResponsibility" register={register} rows={3} />
                  <FormTextarea label="Do you provide products on sale for children's consumption?" name="sectionB.productsForChildren" register={register} rows={2} />
                </>
              )}

              {organizationType !== 'CorporationCompany' && (
                <FormInput label="Scope of Work" name="sectionB.scopeOfWork" register={register} />
              )}

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Does your organization have an academic program on ECD?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" value="yes" {...register('sectionB.academicProgram.hasProgram')} />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" value="no" {...register('sectionB.academicProgram.hasProgram')} />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Does your organization conduct research activities on ECD?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" value="yes" {...register('sectionB.researchActivities.hasProgram')} />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" value="no" {...register('sectionB.researchActivities.hasProgram')} />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* SECTION C: Program Details */}
          {[
            { ageGroup: '0-3', key: 'program0to3', hasProgram: hasProgram0to3 },
            { ageGroup: '3-5', key: 'program3to5', hasProgram: hasProgram3to5 },
            { ageGroup: '5-6', key: 'program5to6', hasProgram: hasProgram5to6 },
            { ageGroup: '6-8', key: 'program6to8', hasProgram: hasProgram6to8 },
          ].map(({ ageGroup, key }) => (
            <CollapsibleSection
              key={key}
              title={`Section C: Program Details (${ageGroup} Years)`}
              isOpen={openSections.includes(key)}
              onToggle={() => toggleSection(key)}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" {...register(`${key}.hasProgram` as any)} className="h-4 w-4" />
                  <label className="text-sm font-medium text-gray-700">
                    Does your organization have a program for {ageGroup} year old children?
                  </label>
                </div>

                {watch(`${key}.hasProgram` as any) && (
                  <div className="border-l-4 border-indigo-200 pl-4 space-y-6">
                    <FormInput label="Name of the Program/Project" name={`${key}.programName`} register={register} />

                    <FormCheckboxGroup
                      label="Target Group"
                      name={`${key}.targetGroup`}
                      register={register}
                      options={[
                        { value: 'rural', label: 'Rural children' },
                        { value: 'urban', label: 'Urban children' },
                        { value: 'slum', label: 'Slum children' },
                        { value: 'ethnic', label: 'Ethnic children' },
                        { value: 'street', label: 'Street children' },
                        { value: 'disability', label: 'Children with disability' },
                        { value: 'others', label: 'Others' },
                      ]}
                    />

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-800 mb-3">Duration of the Program</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Starting Date" name={`${key}.startDate`} register={register} type="date" />
                        <FormInput label="Tentative Ending Date" name={`${key}.endDate`} register={register} type="date" />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-800 mb-3">Area Covered</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Number of Districts" name={`${key}.numberOfDistricts`} register={register} type="number" />
                        <FormInput label="Number of Upazilas" name={`${key}.numberOfUpazilas`} register={register} type="number" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <FormInput label="District Names" name={`${key}.districtName`} register={register} />
                        <FormInput label="Upazila Names" name={`${key}.upazilaName`} register={register} />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-800 mb-3">Parenting Education</h4>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormInput label="Total Parents" name={`${key}.parentingEducation.totalParents`} register={register} type="number" />
                          <FormInput label="Mothers" name={`${key}.parentingEducation.mothers`} register={register} type="number" />
                          <FormInput label="Fathers" name={`${key}.parentingEducation.fathers`} register={register} type="number" />
                        </div>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" {...register(`${key}.parentingEducation.hasSupportGroup` as any)} className="h-4 w-4" />
                          <span className="text-sm text-gray-700">Do you have community support group for parenting education?</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-800 mb-3">Day Care Center</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormInput label="Number of Centers" name={`${key}.dayCareCenter.number`} register={register} type="number" />
                        <FormInput label="Children Covered" name={`${key}.dayCareCenter.childrenCovered`} register={register} type="number" />
                        <FormInput label="Caregivers Per Center" name={`${key}.dayCareCenter.caregiversPerCenter`} register={register} type="number" />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <label className="flex items-center space-x-2 mb-3">
                        <input type="checkbox" {...register(`${key}.healthAndNutrition.hasActivities` as any)} className="h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">Do you have health and nutrition activities?</span>
                      </label>
                      {watch(`${key}.healthAndNutrition.hasActivities` as any) && (
                        <FormCheckboxGroup
                          label="Health and Nutrition Activities"
                          name={`${key}.healthAndNutrition.activities`}
                          register={register}
                          options={[
                            { value: 'antenatal', label: 'Antenatal care' },
                            { value: 'postnatal', label: 'Postnatal care' },
                            { value: 'healthClinic', label: 'Health centre/clinic' },
                            { value: 'hygiene', label: 'Hygiene/infection prevention' },
                            { value: 'mentalHealth', label: 'Mental health' },
                            { value: 'safety', label: 'Safety, securities and injury prevention' },
                          ]}
                        />
                      )}
                    </div>

                    {(ageGroup === '3-5' || ageGroup === '5-6') && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-800 mb-3">
                          {ageGroup === '3-5' ? 'Early Learning Center' : 'Pre-primary Education'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {ageGroup === '3-5' ? (
                            <>
                              <FormInput label="Home Based Centers" name={`${key}.earlyLearningCenter.homeBasedCenters`} register={register} type="number" />
                              <FormInput label="Center Based Centers" name={`${key}.earlyLearningCenter.centerBasedCenters`} register={register} type="number" />
                              <FormInput label="Children Covered" name={`${key}.earlyLearningCenter.childrenCovered`} register={register} type="number" />
                            </>
                          ) : (
                            <>
                              <FormInput label="Total Pre-primary Centers" name={`${key}.prerimaryEducation.totalCenters`} register={register} type="number" />
                              <FormInput label="Children Covered" name={`${key}.prerimaryEducation.childrenCovered`} register={register} type="number" />
                              <FormInput label="Teachers Per School" name={`${key}.prerimaryEducation.teachersPerSchool`} register={register} type="number" />
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {ageGroup === '6-8' && (
                      <div className="border-t pt-4">
                        <label className="flex items-center space-x-2 mb-3">
                          <input type="checkbox" {...register(`${key}.supportProgramEarlyGrades.hasProgram` as any)} className="h-4 w-4" />
                          <span className="text-sm font-medium text-gray-700">
                            Do you have support program in early grades for pre-school graduates?
                          </span>
                        </label>
                        {watch(`${key}.supportProgramEarlyGrades.hasProgram` as any) && (
                          <FormTextarea label="Description (e.g. study cycle, reading circle)" name={`${key}.supportProgramEarlyGrades.description`} register={register} rows={2} />
                        )}
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-800 mb-3">Program for Children with Disability</h4>
                      <div className="space-y-3">
                        <FormInput label="Number of Children Covered" name={`${key}.disabilityProgram.childrenCovered`} register={register} type="number" />
                        <FormTextarea label="Activities" name={`${key}.disabilityProgram.activities`} register={register} rows={2} />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <label className="flex items-center space-x-2 mb-3">
                        <input type="checkbox" {...register(`${key}.otherActivities.hasOther` as any)} className="h-4 w-4" />
                        <span className="text-sm font-medium text-gray-700">Do you have any other program activity?</span>
                      </label>
                      {watch(`${key}.otherActivities.hasOther` as any) && (
                        <FormTextarea label="Please describe" name={`${key}.otherActivities.description`} register={register} rows={2} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleSection>
          ))}

          {/* SECTION D: Training, Monitoring & Supervision, Funding and Partners */}
          <CollapsibleSection
            title="Section D: Training, Monitoring & Supervision, Funding and Partners"
            isOpen={openSections.includes('sectionD')}
            onToggle={() => toggleSection('sectionD')}
          >
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2 mb-4">
                  <input type="checkbox" {...register('sectionD.training.hasOwnSystem')} className="h-4 w-4" />
                  <span className="text-sm font-medium text-gray-700">Do you have own training system?</span>
                </label>

                <div className="ml-6 space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register('sectionD.training.trainers0to3')} className="h-4 w-4" />
                    <span className="text-sm text-gray-700">Do you have trainers for 0-3 year children?</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register('sectionD.training.trainers3to5')} className="h-4 w-4" />
                    <span className="text-sm text-gray-700">Do you have trainers for 3-5 year children?</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register('sectionD.training.trainers5to6')} className="h-4 w-4" />
                    <span className="text-sm text-gray-700">Do you have trainers for 5-6 year children?</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register('sectionD.training.trainers6to8')} className="h-4 w-4" />
                    <span className="text-sm text-gray-700">Do you have trainers for 6-8 year children?</span>
                  </label>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium text-gray-800 mb-3">Number of Total Trainers</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput label="Total" name="sectionD.training.totalTrainers.total" register={register} type="number" />
                    <FormInput label="Male" name="sectionD.training.totalTrainers.male" register={register} type="number" />
                    <FormInput label="Female" name="sectionD.training.totalTrainers.female" register={register} type="number" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="flex items-center space-x-2 mb-2">
                  <input type="checkbox" {...register('sectionD.supervisionAndMonitoring.hasOwnSystem')} className="h-4 w-4" />
                  <span className="text-sm font-medium text-gray-700">Do you have own supervision and monitoring system?</span>
                </label>
                <FormInput label="Number of Supervisors/Monitors" name="sectionD.supervisionAndMonitoring.numberOfSupervisors" register={register} type="number" />
              </div>

              <div className="border-t pt-4">
                <FormCheckboxGroup
                  label="Funding Source"
                  name="sectionD.funding"
                  register={register}
                  options={[
                    { value: 'self', label: 'Self' },
                    { value: 'community', label: 'Community' },
                    { value: 'donor', label: 'Donor' },
                    { value: 'others', label: 'Others' },
                  ]}
                />
              </div>

              <div className="border-t pt-4">
                <FormRadioGroup
                  label="How do you implement your program?"
                  name="sectionD.implementingPartner.implementationType"
                  register={register}
                  options={[
                    { value: 'Own', label: 'Own' },
                    { value: 'Partner', label: 'Partner' },
                  ]}
                />
                {watch('sectionD.implementingPartner.implementationType') === 'Partner' && (
                  <FormInput label="Names of Implementing Partner Organizations" name="sectionD.implementingPartner.partnerNames" register={register} />
                )}
              </div>
            </div>
          </CollapsibleSection>

          {/* SECTION E: Reasons for Applying for BEN Membership */}
          <CollapsibleSection
            title="Section E: Reasons for Applying for BEN Membership"
            isOpen={openSections.includes('sectionE')}
            onToggle={() => toggleSection('sectionE')}
          >
            <div className="space-y-6">
              <FormTextarea
                label="Why does your organization want to become a member of BEN?"
                name="sectionE.motivation"
                register={register}
                rows={4}
              />
              <FormTextarea
                label="What joint activities do you envision collaborating with BEN?"
                name="sectionE.jointActivities"
                register={register}
                rows={4}
              />
              <FormTextarea
                label="What kind of contribution will your organization provide?"
                name="sectionE.contribution"
                register={register}
                rows={4}
              />
            </div>
          </CollapsibleSection>

          {/* SECTION F: Respondent's Information */}
          <CollapsibleSection
            title="Section F: Respondent's Information"
            isOpen={openSections.includes('sectionF')}
            onToggle={() => toggleSection('sectionF')}
          >
            <div className="space-y-4">
              <FormInput label="Name" name="sectionF.name" register={register} required />
              <FormInput label="Designation" name="sectionF.designation" register={register} required />
              <FormInput label="Organization" name="sectionF.organization" register={register} required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Contact Number" name="sectionF.contactNumber" register={register} type="tel" />
                <FormInput label="Email" name="sectionF.email" register={register} type="email" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Skype ID" name="sectionF.skypeId" register={register} />
                <FormInput label="Date of Submission" name="sectionF.dateOfSubmission" register={register} type="date" />
              </div>
            </div>
          </CollapsibleSection>

          {/* Submit Button */}
          <div className="flex justify-center pt-8 border-t">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

