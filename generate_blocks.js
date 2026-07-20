import fs from 'fs';

const biharData = {
  "Araria": ["Araria", "Bhargama", "Forbesganj", "Jokihat", "Kursakanta", "Narpatganj", "Palasi", "Raniganj", "Sikti"],
  "Arwal": ["Arwal", "Kaler", "Karpi", "Kurtha", "Sonbhadra Banshi Suryapur"],
  "Aurangabad": ["Aurangabad", "Barun", "Daudnagar", "Deo", "Goh", "Haspura", "Kutumba", "Madanpur", "Navinagar", "Obra", "Rafiganj"],
  "Banka": ["Amarpur", "Banka", "Barahat", "Belhar", "Bounsi", "Chandan", "Dhoraiya", "Fullidumar", "Katoriya", "Rajoun", "Shambhuganj"],
  "Begusarai": ["Bachhwara", "Bakhri", "Balia", "Barauni", "Begusarai", "Bhagwanpur", "Birpur", "Cheria Bariarpur", "Chhaurahi", "Dandari", "Garhpura", "Khudabandpur", "Mansoorchak", "Matihani", "Naokothi", "Sahebpur Kamal", "Shamho Akha Kurha", "Teghra"],
  "Bhagalpur": ["Bihpur", "Colgong", "Gopalpur", "Goradih", "Ismailpur", "Jagdishpur", "Kharik", "Narayanpur", "Nathnagar", "Navgachhia", "Pirpainti", "Sabour", "Sanhaula", "Shahkund", "Sonhaula", "Sultanganj"],
  "Bhojpur": ["Agiaon", "Ara", "Barhara", "Bihiya", "Charpokhari", "Garhani", "Jagdishpur", "Koilwar", "Piro", "Sahar", "Sandesh", "Shahpur", "Tarari", "Udwantnagar"],
  "Buxar": ["Brahmpur", "Buxar", "Chakki", "Chaugain", "Chausa", "Dumraon", "Itarhi", "Kesath", "Navanagar", "Rajpur", "Simri"],
  "Darbhanga": ["Alinagar", "Baheri", "Bahadurpur", "Baleipur", "Benipur", "Biraul", "Darbhanga", "Ghanshyampur", "Hanumannagar", "Hayaghat", "Jale", "Keotirunway", "Kiratpur", "Kusheshwar Asthan", "Kusheshwar Asthan Purbi", "Manigachhi", "Singhwara", "Tardih"],
  "East Champaran": ["Adapur", "Areraj", "Banjaria", "Bankatwa", "Bapudham Motihari", "Chakia", "Chiraia", "Chhauradano", "Dhaka", "Ghorasahan", "Harsidhi", "Kalyanpur", "Kesaria", "Kotwa", "Madhuban", "Mehsi", "Motihari", "Narkatia", "Paharpur", "Pakridayal", "Patahi", "Phenhara", "Piprakothi", "Ramgarhwa", "Raxaul", "Sangrampur", "Sugauli", "Tetaria", "Turkaulia"],
  "Gaya": ["Amas", "Atri", "Banke Bazar", "Barachatti", "Belaganj", "Bodh Gaya", "Dobhi", "Dumaria", "Fatehpur", "Gaya Town", "Guraru", "Gurua", "Imamganj", "Khizirsarai", "Konch", "Manpur", "Mohanpur", "Muhra", "Neem Chak Bathani", "Paraiya", "Sherghati", "Tan Kuppa", "Tekari", "Wazirganj"],
  "Gopalganj": ["Baikunthpur", "Barauli", "Bhorey", "Gopalganj", "Hathua", "Katiya", "Kuchaikote", "Manjha", "Phulwaria", "Panchdeori", "Sidhwalia", "Thawe", "Uchkagaon", "Vijayipur"],
  "Jamui": ["Barhat", "Chakai", "Gidhaur", "Islamnagar Aliganj", "Jamui", "Jhajha", "Khaigaira", "Khaira", "Laxmipur", " सिकन्दरा (Sikandra)", "Sono"],
  "Jehanabad": ["Ghoshi", "Hulasganj", "Jehanabad", "Kako", "Makhdumpur", "Modanganj", "Ratni Faridpur"],
  "Kaimur": ["Adhaura", "Bhabua", "Bhagwanpur", "Chainpur", "Chand", "Durgawati", "Kudra", "Mohania", "Nuav", "Ramgarh", "Rohtas"],
  "Katihar": ["Amdabad", "Azamnagar", "Balrampur", "Barari", "Barsoi", "Dandkhora", "Falka", "Hasanganj", "Kadwa", "Katihar", "Korha", "Kurmtha", "Kursela", "Mansahi", "Manihari", "Pranpur", "Sameli"],
  "Khagaria": ["Alauli", "Beldaur", "Chautham", "Gogri", "Khagaria", "Mansi", "Parbatta"],
  "Kishanganj": ["Bahadurganj", "Dighalbank", "Kishanganj", "Kochadhaman", "Pothia", "Terhagachh", "Thakurganj"],
  "Lakhisarai": ["Barahiya", "Channan", "Halsi", "Lakhisarai", "Pipariya", "Ramgarh Chowk", "Suryagarha"],
  "Madhepura": ["Alamnagar", "Bihariganj", "Chausa", "Gamhariya", "Ghelardh", "Gwalpara", "Kumarkhand", "Madhepura", "Murliganj", "Puraini", "Shankarpur", "Singheshwar"],
  "Madhubani": ["Andhratharhi", "Babubarhi", "Basopatti", "Benipatti", "Bisfi", "Harlakhi", "Jainagar", "Jhanjharpur", "Kaluahi", "Khajauli", "Ladania", "Laukaha", "Laukahi", "Madhepur", "Madhubani", "Pandaul", "Phulparas", "Rajnagar"],
  "Munger": ["Asarganj", "Bariarpur", "Dharhara", "Haveli Kharagpur", "Jamalpur", "Munger", "Sadar", "Sangrampur", "Tarapur", "Tetiha Bamber"],
  "Muzaffarpur": ["Aurai", "Bandra", "Baruraj", "Bochahan", "Gaighat", "Kanti", "Katra", "Kurhani", "Marwan", "Minapur", "Motipur", "Muraul", "Mushahari", "Paroo", "Sakra", "Saraiya", "Sahebganj"],
  "Nalanda": ["Asthawan", "Ben", "B थर (Bithar)", "Bhui", "Biharsarif", "Bind", "Chandi", "Ekangarsarai", "Giriak", "Harnaut", "Hilsa", "Islampur", "Karai Parsurai", "Katrisarai", "Noorsarai", "Parwalpur", "Rahui", "Rajgir", "Sarmera", "Silao", "Tharthari"],
  "Nawada": ["Akbarpur", "Govindpur", "Hisua", "Kashchak", "Kawakol", "Meskaur", "Nardiganj", "Nawada", "Pakribarawan", "Rajauli", "Roh", "Sirdala", "Warisaliganj"],
  "Patna": ["Athmalgola", "Bakhtiarpur", "Barh", "Belchhi", "Bihta", "Bikram", "Danapur", "Daniyawan", "Dhanarua", "Dulhin Bazar", "Fatwah", "Ghoswari", "Khusrupur", "Maner", "Masaurhi", "Mokama", "Naubatpur", "Paliganj", "Pandarak", "Patna Sadar", "Phulwari Sharif", "Punpun", "Sampatchak"],
  "Purnia": ["Amour", "Baisa", "Baisi", "Banmankhi", "Barhara Kothi", "Bhawanipur", "Dagarua", "Dhamdaha", "Jalalgarh", "Kasba", "Krityanand Nagar", "Purnia East", "Rupauli", "Srinagar"],
  "Rohtas": ["Akorhi Gola", "Bikramganj", "Chenari", "Dawat", "Dehri", "Dinara", "Karakat", "Kargahar", "Kochas", "Nasariganj", "Nauhatta", "Nokha", "Rajpur", "Rohtas", "Sanjhauli", "Sasaram", "Sheosagar", "Surajpura", "Tilouthu"],
  "Saharsa": ["Banma Itahari", "Kahara", "Mahishi", "Navahatta", "Patarghat", "Salkhua", "Satar Katiya", "Saur Bazar", "Simri Bakhtiarpur", "Sonbarsa"],
  "Samastipur": ["Bidyapati Nagar", "Bithan", "Dalssinghsarai", "Hasanpur", "Kalyanpur", "Khanpur", "Mohiuddinagar", "Morwa", "Patori", "Pusa", "Rosera", "Samastipur", "Sarairanjan", "Shivaji Nagar", "Singhia", "Tajpur", "Ujiarpur", "Vidyapati Nagar", "Warisnagar"],
  "Saran": ["Amnour", "Baniapur", "Chhapra", "Dariyapur", "Dighwara", "Ekma", "Garkha", "Ishupur", "Jalalpur", "Lahladpur", "Maker", "Manjhi", "Marhaurah", "Mashrakh", "Nagra", "Panapur", "Parsa", "Revelganj", "Taraiya"],
  "Sheikhpura": ["Ariari", "Barbigha", "Chewara", "Ghatkusumbha", "Sheikhpura", "Shekhopur Sarai"],
  "Sheohar": ["Dumri Katsari", "Piprahi", "Purnahiya", "Sheohar", "Tariani Chowk"],
  "Sitamarhi": ["Bairgania", "Bajpatti", "Bathanaha", "Belsand", "Bokhra", "Choraut", "Dumra", "Majorganj", "Nanpur", "Parihar", "Parsauni", "Pupri", "Riga", "Runnisaidpur", "Sonbarsa", "Sursand", "Suppi"],
  "Siwan": ["Andar", "Barharia", "Basantpur", "Bhagwanpur Hat", "Darauli", "Daraundha", "Goriakothi", "Guthani", "Hasan Pura", "Hussainganj", "Lakri Nabiganj", "Maharajganj", "Mairwa", "Nautan", "Pachrukhi", "Raghunathpur", "Siswan", "Siwan", "Ziradei"],
  "Supaul": ["Basantpur", "Chhatapur", "Kishanpur", "Laukahi", "Marauna", "Nirmali", "Pipra", "Pratapganj", "Raghopur", "Saraigarh Bhaptiyahi", "Supaul", "Tribeniganj"],
  "Vaishali": ["Bhagwanpur", "Bidupur", "Chehra Kalan", "Desari", "Garaul", "Hajipur", "Jandaha", "Lalganj", "Mahnar", "Mahua", "Patepur", "Patedhi Belsar", "Raghopur", "Rajapakar", "Sahdai Buzurg", "Vaishali"],
  "West Champaran": ["Bagaha-1", "Bagaha-2", "Bairia", "Bettiah", "Bhitaha", "Chanpatia", "Gaunaha", "Jogapatti", "Lauriya", "Madhubani", "Mainatand", "Majhaulia", "Narkatiaganj", "Piprasi", "Ramnagar", "Sikta", "Thakrahan", "Yogapatti"]
};

let output = `// Auto-generated Bihar District and Block Data
// Total Districts: 38
// Total Blocks: 534

export const biharData: Record<string, string[]> = ${JSON.stringify(biharData, null, 2)};

export const biharDistricts = Object.keys(biharData).sort();

export const getBlocksForDistrict = (district: string): string[] => {
  return biharData[district] ? [...biharData[district]].sort() : [];
};
`;

fs.writeFileSync('src/utils/biharDistricts.ts', output);
console.log("Generated src/utils/biharDistricts.ts");
