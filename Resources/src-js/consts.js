var Consts = {};

/**
 * Holds list of properties tooltips.
 *
 * @var {Object}
 * @protected
 */
Consts.tips = {
    fieldName: {
        title: 'Field Name',
        tip: 'Set the field name [0-9a-z_]'
    },
    addAmount: {
        title: 'Stepping',
        tip: 'Defines increase/decrease amount'
    },
    allowTime: {
        title: 'Allow Time',
        tip: 'Enable/Disable time section'
    },
    calcValues: {
        title: 'Calculation Values',
        tip: 'These Values will be used in calculations but not shown on your form'
    },
    cols: {
        title: 'Columns',
        tip: 'Width of textarea'
    },
    countryCode: {
        title: 'Country Code',
        tip: 'Ask for country code'
    },
    defaultTime: {
        title: 'Default Time',
        tip: 'Should we pre-populate date field with current time'
    },
    defaultValue: {
        title: 'Default Value',
        tip: 'Pre-populate a value'
    },
    description: {
        title: 'Hover Text',
        tip: 'Show description about question'
    },
    emptyText: {
        title: 'Empty Option Text',
        tip: 'Text to be used as the "empty" option. For example: "Please Select"'
    },
    formWidth: {
        title: 'Form Width',
        tip: 'Resize form width'
    },
    format: {
        title: 'Date Format',
        tip: 'Set a format for date: EU or US'
    },
    headerType: {
        title: 'Heading Type',
        tip: 'Size of heading'
    },
    hint: {
        title: 'Input Hint',
        tip: 'Show an example in gray'
    },
    injectCSS: {
        title: 'Inject Custom CSS',
        tip: '<br>' + 'Add your own CSS code to your form. You can change every aspect of the form by using CSS codes. For example:' + '<br><pre><code>.form-line-active {\n  background:lightblue;\n  color:#000000;\n}\n</code></pre>' + 'will change the selected line\'s background color on the live form.' + '<br><br>' + 'Using Firebug or similar tools will help you identify class names and defined styles.'
    },
    injectJS: {
        title: 'Inject Custom JS',
        tip: '<br>' + 'Add your own JS code to your calculation field. This code will run right after the value has calculated.'
    },
    inputType: {
        title: 'Input Type',
        tip: 'Define input method for matrix'
    },
    isDefault: {
        title: 'Is Default Form',
        tip: 'Yes or No.'
    },
    isTable: {
        title: 'Is Table Form',
        tip: 'Yes or No.'
    },
    labelAlign: {
        title: 'Label Align',
        tip: 'Align question label'
    },
    labelWidth: {
        title: 'Label Width',
        tip: 'Resize question label width'
    },
    matrixwidth: {
        title: 'Table Width',
        tip: 'Width size of the Matrix table. '
    },
    matrixcells: {
        title: 'Cells Width',
        tip: 'Width size of table cells in Matrix.'
    },
    matrixcolumns: {
        title: 'Columns',
        tip: 'Labels at the top of the matrix'
    },
    matrixrows: {
        title: 'Rows',
        tip: 'Labels at the left side of the matrix'
    },
    maxValue: {
        title: 'Maximum Value',
        tip: 'When you set this value, it won\'t let users to select more than this number'
    },
    maxsize: {
        title: 'Max Size',
        tip: 'Maximum allowed characters for this field'
    },
    middle: {
        title: 'Middle Name',
        tip: 'Ask for middle name'
    },
    minValue: {
        title: 'Minimum Value',
        tip: 'When you set this value, it won\'t let users to select less than this number'
    },
    options: {
        title: 'Options',
        tip: 'Users can choose from these options'
    },
    prefix: {
        title: 'Prefix',
        tip: 'Ask for prefix: Mr., Mrs., Dr.'
    },
    prefixChoices: {
        title: 'Prefix Choices',
        tip: 'A predefined list of prefixes for users to select from a dropdown box'
    },
    readonly: {
        title: 'Read-only',
        tip: 'Prevents a form field value from being modified by the end-user. This can be useful for pre-population'
    },
    required: {
        title: 'Require',
        tip: 'Require completing question'
    },
    rows: {
        title: 'Rows',
        tip: 'Number of lines on textarea'
    },
    selected: {
        title: 'Selected',
        tip: 'Default selected answer'
    },
    size: {
        title: 'Size',
        tip: 'Set number of characters users can enter'
    },
    special: {
        title: 'Special Options',
        tip: 'Collection of predefined values to be used on your form. Such as <u>Countries</u>.'
    },
    spreadCols: {
        title: 'Spread To Columns',
        tip: 'Spread inputs into multiple columns. Useful if you have lots of options.'
    },
    status: {
        title: 'Form Status',
        tip: 'Enable or Disable Form.'
    },
    step: {
        title: 'Minute Step',
        tip: 'Space between minutes in drop down.'
    },
    subHeader: {
        title: 'Sub Header',
        tip: 'Text below heading'
    },
    subLabel: {
        title: 'Sub Label',
        tip: 'Small description below the input field'
    },
    suffix: {
        title: 'Suffix',
        tip: 'Ask for suffix: Ph.D, M.D., Jr, VII'
    },
    text: {
        title: 'Text',
        tip: 'Label of your question'
    },
    timeFormat: {
        title: 'Time Format',
        tip: 'Choose 12 Hours or 24 Hours format'
    },
    showDayPeriods: {
        title: 'Day Periods',
        tip: 'Hide the morning or afternoon period in AM/PM format'
    },
    title: {
        title: 'Form Title',
        tip: 'A short descriptive name for this form'
    },
    pluralTitle: {
        title: 'Plural Form Title',
        tip: 'The plural version of the form name'
    },
    validation: {
        title: 'Validation',
        tip: 'Validate entry format'
    },
    visibility: {
        title: 'Visibility',
        tip: 'Hide or show collapse field'
    }
};

/**
 * Holds list of special options .
 *
 * @var {Object}
 * @protected
 */
Consts.specialOptions = {
    'None': {
        controls: 'dropdown,radio,checkbox,matrix'
    },
    'US States': {
        controls: 'dropdown',
        value: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    },
    'US States Abbr': {
        controls: 'dropdown',
        value: ['AL', 'AK', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    },
    'Canadian Provinces': {
        controls: 'dropdown',
        value: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon']
    },
    'Countries': {
        controls: 'dropdown',
        value: ['United States', 'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'The Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'People\'s Republic of China', 'Republic of China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'Gabon', 'The Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea', 'South Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Nagorno-Karabakh', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Turkish Republic of Northern Cyprus', 'Northern Mariana', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Barthelemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'Somaliland', 'South Africa', 'South Ossetia', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Transnistria Pridnestrovie', 'Trinidad and Tobago', 'Tristan da Cunha', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'British Virgin Islands', 'Isle of Man', 'US Virgin Islands', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe']
    },
    'Gender': {
        controls: 'dropdown,radio,checkbox',
        value: ['Male', 'Female', 'N/A']
    },
    'Days': {
        controls: 'dropdown,radio,checkbox',
        value: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    'Months': {
        controls: 'dropdown,radio,checkbox',
        value: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        nonLocale: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    'Time Zones': {
        controls: 'dropdown',
        value: ['[[Africa]]', 'Abidjan (GMT)', 'Accra (GMT)', 'Addis Ababa (GMT+03:00)', 'Algiers (GMT+01:00)', 'Asmara (GMT+03:00)', 'Bamako (GMT)', 'Bangui (GMT+01:00)', 'Banjul (GMT)', 'Bissau (GMT)', 'Blantyre (GMT+02:00)', 'Brazzaville (GMT+01:00)', 'Bujumbura (GMT+02:00)', 'Cairo (GMT+03:00)', 'Casablanca (GMT)', 'Ceuta (GMT+02:00)', 'Conakry (GMT)', 'Dakar (GMT)', 'Dar es Salaam (GMT+03:00)', 'Djibouti (GMT+03:00)', 'Douala (GMT+01:00)', 'El Aaiun (GMT)', 'Freetown (GMT)', 'Gaborone (GMT+02:00)', 'Harare (GMT+02:00)', 'Johannesburg (GMT+02:00)', 'Kampala (GMT+03:00)', 'Khartoum (GMT+03:00)', 'Kigali (GMT+02:00)', 'Kinshasa (GMT+01:00)', 'Lagos (GMT+01:00)', 'Libreville (GMT+01:00)', 'Lome (GMT)', 'Luanda (GMT+01:00)', 'Lubumbashi (GMT+02:00)', 'Lusaka (GMT+02:00)', 'Malabo (GMT+01:00)', 'Maputo (GMT+02:00)', 'Maseru (GMT+02:00)', 'Mbabane (GMT+02:00)', 'Mogadishu (GMT+03:00)', 'Monrovia (GMT)', 'Nairobi (GMT+03:00)', 'Ndjamena (GMT+01:00)', 'Niamey (GMT+01:00)', 'Nouakchott (GMT)', 'Ouagadougou (GMT)', 'Porto-Novo (GMT+01:00)', 'Sao Tome (GMT)', 'Tripoli (GMT+02:00)', 'Tunis (GMT+02:00)', 'Windhoek (GMT+01:00)', '[[America]]', 'Adak (GMT-09:00)', 'Anchorage (GMT-08:00)', 'Anguilla (GMT-04:00)', 'Antigua (GMT-04:00)', 'Araguaina (GMT-03:00)', 'Buenos Aires, Argentina (GMT-03:00)', 'Catamarca, Argentina (GMT-03:00)', 'Cordoba, Argentina (GMT-03:00)', 'Jujuy, Argentina (GMT-03:00)', 'La Rioja, Argentina (GMT-03:00)', 'Mendoza, Argentina (GMT-03:00)', 'Rio Gallegos, Argentina (GMT-03:00)', 'Salta, Argentina (GMT-03:00)', 'San Juan, Argentina (GMT-03:00)', 'San Luis, Argentina (GMT-04:00)', 'Tucuman, Argentina (GMT-03:00)', 'Ushuaia, Argentina (GMT-03:00)', 'Aruba (GMT-04:00)', 'Asuncion (GMT-04:00)', 'Atikokan (GMT-05:00)', 'Bahia (GMT-03:00)', 'Barbados (GMT-04:00)', 'Belem (GMT-03:00)', 'Belize (GMT-06:00)', 'Blanc-Sablon (GMT-04:00)', 'Boa Vista (GMT-04:00)', 'Bogota (GMT-05:00)', 'Boise (GMT-06:00)', 'Cambridge Bay (GMT-06:00)', 'Campo Grande (GMT-04:00)', 'Cancun (GMT-05:00)', 'Caracas (GMT-04:30)', 'Cayenne (GMT-03:00)', 'Cayman (GMT-05:00)', 'Chicago (GMT-05:00)', 'Chihuahua (GMT-06:00)', 'Costa Rica (GMT-06:00)', 'Cuiaba (GMT-04:00)', 'Curacao (GMT-04:00)', 'Danmarkshavn (GMT)', 'Dawson (GMT-07:00)', 'Dawson Creek (GMT-07:00)', 'Denver (GMT-06:00)', 'Detroit (GMT-04:00)', 'Dominica (GMT-04:00)', 'Edmonton (GMT-06:00)', 'Eirunepe (GMT-04:00)', 'El Salvador (GMT-06:00)', 'Fortaleza (GMT-03:00)', 'Glace Bay (GMT-03:00)', 'Godthab (GMT-02:00)', 'Goose Bay (GMT-03:00)', 'Grand Turk (GMT-04:00)', 'Grenada (GMT-04:00)', 'Guadeloupe (GMT-04:00)', 'Guatemala (GMT-06:00)', 'Guayaquil (GMT-05:00)', 'Guyana (GMT-04:00)', 'Halifax (GMT-03:00)', 'Havana (GMT-04:00)', 'Hermosillo (GMT-07:00)', 'Indianapolis, Indiana (GMT-04:00)', 'Knox, Indiana (GMT-05:00)', 'Marengo, Indiana (GMT-04:00)', 'Petersburg, Indiana (GMT-04:00)', 'Tell City, Indiana (GMT-05:00)', 'Vevay, Indiana (GMT-04:00)', 'Vincennes, Indiana (GMT-04:00)', 'Winamac, Indiana (GMT-04:00)', 'Inuvik (GMT-06:00)', 'Iqaluit (GMT-04:00)', 'Jamaica (GMT-05:00)', 'Juneau (GMT-08:00)', 'Louisville, Kentucky (GMT-04:00)', 'Monticello, Kentucky (GMT-04:00)', 'La Paz (GMT-04:00)', 'Lima (GMT-05:00)', 'Los Angeles (GMT-07:00)', 'Maceio (GMT-03:00)', 'Managua (GMT-06:00)', 'Manaus (GMT-04:00)', 'Marigot (GMT-04:00)', 'Martinique (GMT-04:00)', 'Mazatlan (GMT-06:00)', 'Menominee (GMT-05:00)', 'Merida (GMT-05:00)', 'Mexico City (GMT-05:00)', 'Miquelon (GMT-02:00)', 'Moncton (GMT-03:00)', 'Monterrey (GMT-05:00)', 'Montevideo (GMT-03:00)', 'Montreal (GMT-04:00)', 'Montserrat (GMT-04:00)', 'Nassau (GMT-04:00)', 'New York (GMT-04:00)', 'Nipigon (GMT-04:00)', 'Nome (GMT-08:00)', 'Noronha (GMT-02:00)', 'Center, North Dakota (GMT-05:00)', 'New Salem, North Dakota (GMT-05:00)', 'Panama (GMT-05:00)', 'Pangnirtung (GMT-04:00)', 'Paramaribo (GMT-03:00)', 'Phoenix (GMT-07:00)', 'Port-au-Prince (GMT-05:00)', 'Port of Spain (GMT-04:00)', 'Porto Velho (GMT-04:00)', 'Puerto Rico (GMT-04:00)', 'Rainy River (GMT-05:00)', 'Rankin Inlet (GMT-05:00)', 'Recife (GMT-03:00)', 'Regina (GMT-06:00)', 'Resolute (GMT-05:00)', 'Rio Branco (GMT-04:00)', 'Santarem (GMT-03:00)', 'Santiago (GMT-04:00)', 'Santo Domingo (GMT-04:00)', 'Sao Paulo (GMT-03:00)', 'Scoresbysund (GMT)', 'Shiprock (GMT-06:00)', 'St Barthelemy (GMT-04:00)', 'St Johns (GMT-02:30)', 'St Kitts (GMT-04:00)', 'St Lucia (GMT-04:00)', 'St Thomas (GMT-04:00)', 'St Vincent (GMT-04:00)', 'Swift Current (GMT-06:00)', 'Tegucigalpa (GMT-06:00)', 'Thule (GMT-03:00)', 'Thunder Bay (GMT-04:00)', 'Tijuana (GMT-07:00)', 'Toronto (GMT-04:00)', 'Tortola (GMT-04:00)', 'Vancouver (GMT-07:00)', 'Whitehorse (GMT-07:00)', 'Winnipeg (GMT-05:00)', 'Yakutat (GMT-08:00)', 'Yellowknife (GMT-06:00)', '[[Antarctica]]', 'Casey (GMT+11:00)', 'Davis (GMT+05:00)', 'DumontDUrville (GMT+10:00)', 'Mawson (GMT+05:00)', 'McMurdo (GMT+12:00)', 'Palmer (GMT-04:00)', 'Rothera (GMT-03:00)', 'South Pole (GMT+12:00)', 'Syowa (GMT+03:00)', 'Vostok (GMT+06:00)', '[[Arctic]]', 'Longyearbyen (GMT+02:00)', '[[Asia]]', 'Aden (GMT+03:00)', 'Almaty (GMT+06:00)', 'Amman (GMT+03:00)', 'Anadyr (GMT+13:00)', 'Aqtau (GMT+05:00)', 'Aqtobe (GMT+05:00)', 'Ashgabat (GMT+05:00)', 'Baghdad (GMT+03:00)', 'Bahrain (GMT+03:00)', 'Baku (GMT+05:00)', 'Bangkok (GMT+07:00)', 'Beirut (GMT+03:00)', 'Bishkek (GMT+06:00)', 'Brunei (GMT+08:00)', 'Choibalsan (GMT+08:00)', 'Chongqing (GMT+08:00)', 'Colombo (GMT+05:30)', 'Damascus (GMT+03:00)', 'Dhaka (GMT+07:00)', 'Dili (GMT+09:00)', 'Dubai (GMT+04:00)', 'Dushanbe (GMT+05:00)', 'Gaza (GMT+03:00)', 'Harbin (GMT+08:00)', 'Ho Chi Minh (GMT+07:00)', 'Hong Kong (GMT+08:00)', 'Hovd (GMT+07:00)', 'Irkutsk (GMT+09:00)', 'Jakarta (GMT+07:00)', 'Jayapura (GMT+09:00)', 'Jerusalem (GMT+03:00)', 'Kabul (GMT+04:30)', 'Kamchatka (GMT+13:00)', 'Karachi (GMT+06:00)', 'Kashgar (GMT+08:00)', 'Kathmandu (GMT+05:45)', 'Kolkata (GMT+05:30)', 'Krasnoyarsk (GMT+08:00)', 'Kuala Lumpur (GMT+08:00)', 'Kuching (GMT+08:00)', 'Kuwait (GMT+03:00)', 'Macau (GMT+08:00)', 'Magadan (GMT+12:00)', 'Makassar (GMT+08:00)', 'Manila (GMT+08:00)', 'Muscat (GMT+04:00)', 'Nicosia (GMT+03:00)', 'Novokuznetsk (GMT+07:00)', 'Novosibirsk (GMT+07:00)', 'Omsk (GMT+07:00)', 'Oral (GMT+05:00)', 'Phnom Penh (GMT+07:00)', 'Pontianak (GMT+07:00)', 'Pyongyang (GMT+09:00)', 'Qatar (GMT+03:00)', 'Qyzylorda (GMT+06:00)', 'Rangoon (GMT+06:30)', 'Riyadh (GMT+03:00)', 'Sakhalin (GMT+11:00)', 'Samarkand (GMT+05:00)', 'Seoul (GMT+09:00)', 'Shanghai (GMT+08:00)', 'Singapore (GMT+08:00)', 'Taipei (GMT+08:00)', 'Tashkent (GMT+05:00)', 'Tbilisi (GMT+04:00)', 'Tehran (GMT+04:30)', 'Thimphu (GMT+06:00)', 'Tokyo (GMT+09:00)', 'Ulaanbaatar (GMT+08:00)', 'Urumqi (GMT+08:00)', 'Vientiane (GMT+07:00)', 'Vladivostok (GMT+11:00)', 'Yakutsk (GMT+10:00)', 'Yekaterinburg (GMT+06:00)', 'Yerevan (GMT+05:00)', '[[Atlantic]]', 'Azores (GMT)', 'Bermuda (GMT-03:00)', 'Canary (GMT+01:00)', 'Cape Verde (GMT-01:00)', 'Faroe (GMT+01:00)', 'Madeira (GMT+01:00)', 'Reykjavik (GMT)', 'South Georgia (GMT-02:00)', 'St Helena (GMT)', 'Stanley (GMT-04:00)', '[[Australia]]', 'Adelaide (GMT+09:30)', 'Brisbane (GMT+10:00)', 'Broken Hill (GMT+09:30)', 'Currie (GMT+10:00)', 'Darwin (GMT+09:30)', 'Eucla (GMT+08:45)', 'Hobart (GMT+10:00)', 'Lindeman (GMT+10:00)', 'Lord Howe (GMT+10:30)', 'Melbourne (GMT+10:00)', 'Perth (GMT+08:00)', 'Sydney (GMT+10:00)', '[[Europe]]', 'Amsterdam (GMT+02:00)', 'Andorra (GMT+02:00)', 'Athens (GMT+03:00)', 'Belgrade (GMT+02:00)', 'Berlin (GMT+02:00)', 'Bratislava (GMT+02:00)', 'Brussels (GMT+02:00)', 'Bucharest (GMT+03:00)', 'Budapest (GMT+02:00)', 'Chisinau (GMT+03:00)', 'Copenhagen (GMT+02:00)', 'Dublin (GMT+01:00)', 'Gibraltar (GMT+02:00)', 'Guernsey (GMT+01:00)', 'Helsinki (GMT+03:00)', 'Isle of Man (GMT+01:00)', 'Istanbul (GMT+03:00)', 'Jersey (GMT+01:00)', 'Kaliningrad (GMT+03:00)', 'Kiev (GMT+03:00)', 'Lisbon (GMT+01:00)', 'Ljubljana (GMT+02:00)', 'London (GMT+01:00)', 'Luxembourg (GMT+02:00)', 'Madrid (GMT+02:00)', 'Malta (GMT+02:00)', 'Mariehamn (GMT+03:00)', 'Minsk (GMT+03:00)', 'Monaco (GMT+02:00)', 'Moscow (GMT+04:00)', 'Oslo (GMT+02:00)', 'Paris (GMT+02:00)', 'Podgorica (GMT+02:00)', 'Prague (GMT+02:00)', 'Riga (GMT+03:00)', 'Rome (GMT+02:00)', 'Samara (GMT+05:00)', 'San Marino (GMT+02:00)', 'Sarajevo (GMT+02:00)', 'Simferopol (GMT+03:00)', 'Skopje (GMT+02:00)', 'Sofia (GMT+03:00)', 'Stockholm (GMT+02:00)', 'Tallinn (GMT+03:00)', 'Tirane (GMT+02:00)', 'Uzhgorod (GMT+03:00)', 'Vaduz (GMT+02:00)', 'Vatican (GMT+02:00)', 'Vienna (GMT+02:00)', 'Vilnius (GMT+03:00)', 'Volgograd (GMT+04:00)', 'Warsaw (GMT+02:00)', 'Zagreb (GMT+02:00)', 'Zaporozhye (GMT+03:00)', 'Zurich (GMT+02:00)', '[[Indian]]', 'Antananarivo (GMT+03:00)', 'Chagos (GMT+06:00)', 'Christmas (GMT+07:00)', 'Cocos (GMT+06:30)', 'Comoro (GMT+03:00)', 'Kerguelen (GMT+05:00)', 'Mahe (GMT+04:00)', 'Maldives (GMT+05:00)', 'Mauritius (GMT+04:00)', 'Mayotte (GMT+03:00)', 'Reunion (GMT+04:00)', '[[Pacific]]', 'Apia (GMT-11:00)', 'Auckland (GMT+12:00)', 'Chatham (GMT+12:45)', 'Easter (GMT-06:00)', 'Efate (GMT+11:00)', 'Enderbury (GMT+13:00)', 'Fakaofo (GMT-10:00)', 'Fiji (GMT+12:00)', 'Funafuti (GMT+12:00)', 'Galapagos (GMT-06:00)', 'Gambier (GMT-09:00)', 'Guadalcanal (GMT+11:00)', 'Guam (GMT+10:00)', 'Honolulu (GMT-10:00)', 'Johnston (GMT-10:00)', 'Kiritimati (GMT+14:00)', 'Kosrae (GMT+11:00)', 'Kwajalein (GMT+12:00)', 'Majuro (GMT+12:00)', 'Marquesas (GMT-09:30)', 'Midway (GMT-11:00)', 'Nauru (GMT+12:00)', 'Niue (GMT-11:00)', 'Norfolk (GMT+11:30)', 'Noumea (GMT+11:00)', 'Pago Pago (GMT-11:00)', 'Palau (GMT+09:00)', 'Pitcairn (GMT-08:00)', 'Ponape (GMT+11:00)', 'Port Moresby (GMT+10:00)', 'Rarotonga (GMT-10:00)', 'Saipan (GMT+10:00)', 'Tahiti (GMT-10:00)', 'Tarawa (GMT+12:00)', 'Tongatapu (GMT+13:00)', 'Truk (GMT+10:00)', 'Wake (GMT+12:00)', 'Wallis (GMT+12:00)']
    },
    'LocationCountries': {
        controls: 'location',
        value: ['Canada', 'United States', 'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia\/Herzegowina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Ind. Ocean', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Central African Rep.', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocoa (Keeling) Is.', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote Divoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea', 'Kuwait', 'Kyrgyzstan', 'Lao', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Lucia', 'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'St. Helena', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican', 'Venezuela', 'Viet Nam', 'Virgin Islands', 'Western Sahara', 'Yeman', 'Yugoslavia', 'Zaire', 'Zambia']
    },
    getByType: function (type) {
        var options = [];
        for (var key in this) {
            if (this[key].controls && this[key].controls.indexOf(type) >= 0) {
                options.push([key, key]);
            }
        }
        return options;
    }
};
