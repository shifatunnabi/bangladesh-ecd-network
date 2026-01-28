import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ben-network';

// Default admin credentials
const DEFAULT_ADMIN = {
    email: 'admin@ecd-bangladesh.net',
    password: 'BEN@dmin2024',
    name: 'System Administrator',
    role: 'superadmin' as const,
};

// User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
}, { timestamps: true });

// Member Schema
const MemberSchema = new mongoose.Schema({
    organization: { type: String, required: true },
    address: { type: String, default: '' },
    headName: { type: String, default: '' },
    headDesignation: { type: String, default: '' },
    headEmail: { type: String, default: '', lowercase: true },
    focalName: { type: String, default: '' },
    focalDesignation: { type: String, default: '' },
    focalEmail: { type: String, default: '', lowercase: true },
    division: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// CSV Parser
function parseCSVLine(line: string): string[] {
    const fields: string[] = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                currentField += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            fields.push(currentField.trim());
            currentField = '';
        } else {
            currentField += char;
        }
    }

    fields.push(currentField.trim());
    return fields;
}

function parseCSV(content: string): Record<string, string>[] {
    const lines = content.trim().split('\n');
    if (lines.length === 0) return [];

    const headers = parseCSVLine(lines[0]);
    const records: Record<string, string>[] = [];
    let currentLine = '';

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        currentLine += (currentLine ? '\n' : '') + line;

        let quoteCount = 0;
        for (let j = 0; j < currentLine.length; j++) {
            if (currentLine[j] === '"') quoteCount++;
        }

        if (quoteCount % 2 === 0) {
            const fields = parseCSVLine(currentLine);
            const record: Record<string, string> = {};

            headers.forEach((header, index) => {
                record[header] = fields[index] || '';
            });

            if (record['Name of organization']) {
                records.push(record);
            }

            currentLine = '';
        }
    }

    return records;
}

async function seed() {
    console.log('🌱 Starting database seed...\n');

    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Get or create models
        const User = mongoose.models.User || mongoose.model('User', UserSchema);
        const Member = mongoose.models.Member || mongoose.model('Member', MemberSchema);

        // 1. Create default admin user
        console.log('📦 Creating default admin user...');
        const existingAdmin = await User.findOne({ email: DEFAULT_ADMIN.email });

        if (existingAdmin) {
            console.log(`   ⚠️  Admin user already exists: ${DEFAULT_ADMIN.email}`);
        } else {
            const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 12);
            await User.create({
                ...DEFAULT_ADMIN,
                password: hashedPassword,
            });
            console.log(`   ✅ Created admin user: ${DEFAULT_ADMIN.email}`);
            console.log(`   📧 Email: ${DEFAULT_ADMIN.email}`);
            console.log(`   🔑 Password: ${DEFAULT_ADMIN.password}`);
            console.log('   ⚠️  Please change the password after first login!\n');
        }

        // 2. Seed members from CSV
        console.log('\n📦 Seeding members from CSV...');
        const csvPath = path.join(process.cwd(), 'public', 'members.csv');

        if (!fs.existsSync(csvPath)) {
            console.log('   ⚠️  members.csv not found, skipping member seeding');
        } else {
            const csvContent = fs.readFileSync(csvPath, 'utf-8');
            const records = parseCSV(csvContent);
            console.log(`   Found ${records.length} members in CSV`);

            // Check if members already exist
            const existingCount = await Member.countDocuments();
            if (existingCount > 0) {
                console.log(`   ⚠️  ${existingCount} members already exist in database`);
                console.log('   Skipping CSV import to avoid duplicates');
            } else {
                let imported = 0;
                for (const row of records) {
                    const headFullText = row['Name and designation of the Head of the organization'] || '';
                    const headParts = headFullText.split('\n').map(s => s.trim()).filter(Boolean);
                    const headName = headParts[0] || '';
                    const headDesignation = headParts.slice(1).join(' ').trim() || '';

                    const focalFullText = row['Name and designation of the ECD Focal Person'] || '';
                    const focalParts = focalFullText.split('\n').map(s => s.trim()).filter(Boolean);
                    const focalName = focalParts[0] || '';
                    const focalDesignation = focalParts.slice(1).join(' ').trim() || '';

                    let division = row['Division']?.trim() || '';
                    if (division && !division.includes('Division')) {
                        division = division + ' Division';
                    }

                    await Member.create({
                        organization: row['Name of organization']?.trim() || '',
                        address: row['Full address of the organization (Head Office)']?.trim() || '',
                        headName: headName.trim(),
                        headDesignation: headDesignation.trim(),
                        headEmail: row['Email of the Head of the organization']?.trim() || '',
                        focalName: focalName.trim(),
                        focalDesignation: focalDesignation.trim(),
                        focalEmail: row['Email of the ECD Focal Person']?.trim() || '',
                        division: division,
                        isActive: true,
                    });
                    imported++;
                }
                console.log(`   ✅ Imported ${imported} members from CSV`);
            }
        }

        console.log('\n✨ Seed completed successfully!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Default Admin Credentials:');
        console.log(`  Email:    ${DEFAULT_ADMIN.email}`);
        console.log(`  Password: ${DEFAULT_ADMIN.password}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n⚠️  IMPORTANT: Change the default password after first login!');

    } catch (error) {
        console.error('❌ Error during seed:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

// Run seed
seed();
