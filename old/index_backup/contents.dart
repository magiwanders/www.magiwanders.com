import 'package:flutter/material.dart';
import 'package:magiwanders_flutter/components/components.dart';

class Contents {

  //#region ABOUT PAGE

  static final List<Widget> about_whoami = [
    Text('Hi,', style: headlineTextStyle),
    Text('I\'m Simone Shawn Cazzaniga', style: subtitleTextStyle),
  ];

  static final String about_presentation = 'As engineering student and amateur musician, I have learned to use a trans-disciplinary approach to every project I tackle. '+
      'I learned to transfer knowledge and reason from first principles, making sure I have both a deep and contextualized understanding of everything I work with. '+
      'I have always striven to find new challenges, learning to work and communicate well within groups and adapt to new problems and environments. '+
      'My dream is working with both low level computing and audio.';

  static final List<String> about_buttons = [
    'Education',
    'CV',
    'Contact',
    'Further Education'
  ];

  static final List<EducationEntryContent> about_educationEntry = [
    EducationEntryContent(
        'M.Sc. Music & Acoustics Engineering',
        'Polytechnic University of Milan',
        highlights: [
          [
            'The degree is entirely offered in English'
          ],
          [
            'Audio Event Classifier Python Project',
            'Computer Music Languages and Systems Course',
            'https://github.com/magiwanders/CMLS_HW1',
          ],
          [
            'Distortion Effects Juce Plugin Project',
            'Computer Music Languages and Systems Course',
            'https://github.com/magiwanders/CMLS_HW2',
          ],
          [
            'Voice Harmonizer SuperCollider and Processing Project',
            'Computer Music Languages and Systems Course',
            'https://github.com/magiwanders/CMLS_HW3',
          ],
          [
            'Speech Synthesis via Linear Predictive Coding Matlab Project',
            'Digital Audio Analysis and Processing Course',
            //'https://github.com/michele-perrone/DAAP-homework-1',
          ],
          [
            'Audio Source Localization with Linear Microphone Arrays Matlab Project',
            'Digital Audio Analysis and Processing Course',
            //'https://github.com/michele-perrone/DAAP-homework-2',
          ],
          [
            'Three-way Crossover Loudspeaker Modeling with Wave Digital Filters in Matlab',
            'Sound Synthesis and Spatial Processing Course',
            //'https://github.com/michele-perrone/SSSP-homework-1',
          ],
          [
            'Matlab Implementation of the Dattorro Digital Audio Effect Scheme',
            'Sound Synthesis and Spatial Processing Course',
            //'https://github.com/michele-perrone/SSSP-homework-2',
          ],
          [
            'Audio Source Localization Project (Theoretical Dissertation)',
            'Fundamentals of Acoustics Course',
          ],
          [
            'Advanced Rythmic and Harmonic Analysis Project',
            'Computer Music Representations and Models Course',
            'https://github.com/magiwanders/BeatBox_Machine'
          ],
          [
            'Rythm Analysis through APM Python Project',
            'Computer Music Representations and Models Course',
          ],
          [
            'Audio Processing Webapp Javascript Project',
            'Advanced Coding Tools & Methodologies Course',
            'https://beatbox-machine.magiwanders.com/main/index.html'
          ],
          [
            'Flutter Android App \'IdPN\'',
            'Design and Implementation of Mobile Applications Course',
            'https://play.google.com/store/apps/details?id=com.magiwanders.idpn'
          ],
          [
            'Flutter Website \'IdPN\'',
            'Design and Implementation of Mobile Applications Course',
            'https://idpn.magiwanders.com/#/'
          ],
          [
            'Unity Videogame \'I Will Find You\'',
            'Videogame Design & Programming Course',
            'https://github.com/micndr/IWFY_VDP2020'
          ],
          [
            'IoT Simulated Active Matrix Project',
            'Internet Of Things Course'
          ],
          [
            'Multithreaded Client-Server Java Project',
            'Software Engineering Course',
            'https://github.com/magiwanders/IdS_2020'
          ],
          [
            'Essay on the Ideology of Digital Fabrication',
            'Emergent Technologies and Societal Challenges Course'
          ],
          [
            'Essay on the Role of Gender in Innovation processes',
            'Emergent Technologies and Societal Challenges Course'
          ],
        ]
    ),
    EducationEntryContent(
        'B.Sc. Ingegneria dell\'Automazione',
        'Polytechnic University of Milan',
        date: '2020',
        vote: '95/110',
        highlights: [
          [
            'C Language Lab Tutor',
            '[Autunno 2019] Fundamentals of Informatics - Prof. Negri'
          ],
          [
            'MATLAB Projects on audio and medical signals analysis and processing',
            'Numeric Elaboration of Signals Course',
          ],
          [
            'Strong preparation in the base subjects of Computer Science (C, Java), Calculus and Physics, as well as more advanced subjects like Electronics, Mechanics, Robotics and especially Automation and Control Theory and Signal Processing. Fundamentals of Economy, Business and Management.'
          ]
        ]
    ),
    EducationEntryContent(
        'Diploma di Liceo Classico',
        'Liceo Classico Bartolomeo Zucchi (Monza)',
        date: '2016',
        vote: '79/100',
        highlights: [
          [
            '[2015-2016] Member of the School Music Ensemble \"Ensemble Terible\"',
          ],
          [
            '[2014-2015] Member of the School Journal \"Il Bartolomeo\" '
          ],
          [
            '[2015, 2016] Participated to \"Romanae Disputationes\", a 3/4 day philosophy event and competition held in Rome, winning \"Best speaker of the day\" in 2015'
          ],
          [
            'Strong preparation Ancient Greek, Latin, English and Italian Languages and Literatures, History, Art History, Philosophy, Maths, Physics, Chemistry, Biology, Earth Science.'
          ]
        ]
    ),
  ];

  static List<EducationHighlightContent> furtherEduHighlights = [
    EducationHighlightContent(
      "Nand2Tetris - Part I & II",
      subtitle: "An online project-based computer architecture course from the Hebrew University of Jerusalem",
      url: "https://www.nand2tetris.org/"
    ),
    EducationHighlightContent(
      "Leadership (ongoing)",
    ),
    EducationHighlightContent(
      "UX Design (ongoing)",
    ),
    EducationHighlightContent(
      "S.C.I.",
    ),
    EducationHighlightContent(
      "Scouting",
    ),
    EducationHighlightContent(
      "Ham Radio (ongoing)",
    ),
    EducationHighlightContent(
      "P.A.D.I.",
    ),
    EducationHighlightContent(
      "Licenza di Teoria e Solfeggio",
    ),
  ];

  static ContactContent about_cv = ContactContent(
      Icons.download,
      'Download CV',
      'assets/simone_shawn_cazzaniga_cv.pdf'
  );

  static final List<List<dynamic>> _contact = [
    [
      Icons.email,
      'business@magiwanders.com',
      'mailto:simoneshawn.cazzaniga@mail.polimi.it'
    ],
    [
      Icons.phone,
      '+39 333 155 4385',
      'tel:+393331554385'
    ],
    [
      SocialIcons.whatsapp,
      '+39 333 155 4385',
      'https://wa.me/393331554385'
    ],
    [
      SocialIcons.telegram,
      '@magiwanders',
      'https://telegram.me/magiwanders'
    ],
    [
      SocialIcons.linkedin,
      'Simone Shawn Cazzaniga',
      'https://www.linkedin.com/in/simone-shawn-cazzaniga/'
    ],
    [
      SocialIcons.github,
      'magiwanders',
      'https://github.com/magiwanders'
    ],
    [
      Icons.facebook,
      'Simone Shawn Cazzaniga',
      'https://www.facebook.com/SimoneShawnCazzaniga/'
    ],
    [
      SocialIcons.instagram,
      'magi.wanders',
      'https://www.instagram.com/magi.wanders/'
    ]
  ];

  static get about_contact {
    return _contact.map<ContactContent>((info) => ContactContent(info[0], info[1], info[2])).toList();
  }

  //#endregion

  //#region PROJECTS

  static List<CardContent> projects_cards = [
    CardContent(
      title: "This very website",
      description: "Built with Flutter.",
      url: "https://www.magiwanders.com",
      imageUrl: 'images/projects/magi.jpg',
    ),
    CardContent(
      title: "IdPN Android App and Website",
      description: "A database of note-worthy words and neologism built with Flutter.",
      url: "https://idpn.magiwanders.com",
      imageUrl: 'images/projects/idpn.jpg',
    ),
    CardContent(
      title: "Hack Computer JS re-implementation",
      description: "A turing-complete computer built with Javascript. From the popular Nand2Tetris course.",
      url: "https://hack-computer.magiwanders.com",
      imageUrl: 'images/projects/nand2tetris.jpg',
    ),
    CardContent(
      title: "Beatbox Machine",
      description: "APM based beatbox rhythm visualizer built with JS frontend and Python backend.",
      url: "https://beatbox-machine.magiwanders.com",
      imageUrl: 'images/projects/beatbox.jpg',
    ),
    CardContent(
      title: "\"I Will Find You\" Unity Game",
      route: "",
      url: "https://github.com/micndr/IWFY_VDP2020",
      imageUrl: 'images/projects/iwfy.jpg',
    ),
    CardContent(
      title: "3D Printing",
      route: "",
      url: "",
    ),
    CardContent(
      title: "Ham Radio",
      route: "",
      url: "",
    ),
    CardContent(
      title: "Translations",
      route: "",
      url: "",
    ),
    CardContent(
      title: "Photography",
      route: "",
      url: "",
    ),
    CardContent(
      title: "UX Design",
      route: "",
      url: "",
    ),
    CardContent(
      title: "Linux",
      route: "",
      url: "",
    ),
    CardContent(
      title: "Blood Donation",
      route: "",
      url: "",
    ),
    CardContent(
      title: "RISC-V International",
      route: "",
      url: "",
      imageUrl: 'images/projects/riscv.jpg',
    ),
    CardContent(
      title: "Protezione Civile",
      route: "",
      url: "",
    ),
    CardContent(
      title: "Scouting",
      route: "",
      url: "",
      imageUrl: 'images/projects/agesci.jpg',
    ),
    CardContent(
      title: "S.C.I.",
      route: "",
      url: "",
      imageUrl: 'images/projects/sci.jpg',
    ),
  ];

  //#endregion

  //#region MUSIC
  static List<CardContent> music_cards = [
    CardContent(
      title: "Idiofoni",
      description: "Musica prog-rock italiana, originale e demenziale, dal 2014.",
      url: "https://www.youtube.com/channel/UC1DNLxWBeXpwgcXnBM1utgw",
      imageUrl: 'images/music/idiofoni.jpg',
    ),
    CardContent(
      title: "CRC Choral Music",
      description: "I was part of the now defunct groups \"iVox\" and \"Voci Verdi\" choirs from CRC (Centro Creativo Corale) as light tenor until 2020.",
      route: "",
      url: "",
      imageUrl: 'images/music/crc.jpg',
    ),
    CardContent(
      title: "Ginsong Band",
      description: "Live Theatre Band for the \"Ginsong\" amateur theatre group, from 2017 to 2019 I participated as keyboardist and arranger/composer.",
      route: "",
      url: "",
      imageUrl: 'images/music/ginsong.jpg',
    ),
    CardContent(
      title: "Linux Audio and Home Recording",
      description: "Here is my amateur setup to record and produce music using Linux.",
      route: "",
      url: "",
    ),
  ];
  //#endregion

  //#region TRAVEL
  static List<CardContent> travel_cards = [
    CardContent(
      title: "2021 Ireland (mini)",
      route: "",
      url: "",
      imageUrl: 'images/travel/ireland.jpg',
    ),
    CardContent(
      title: "2020 Venice (mini)",
      route: "",
      url: "",
      imageUrl: 'images/travel/venice.jpg',
    ),
    CardContent(
      title: "2019 Armenia",
      route: "",
      url: "",
      imageUrl: 'images/travel/armenia.jpg',
    ),
    CardContent(
      title: "2019 Slovakia (mini)",
      route: "",
      url: "",
      imageUrl: 'images/travel/slovakia.jpg',
    ),
    CardContent(
      title: "2019 Liverpool + Lisbon (mini)",
      route: "",
      url: "",
      imageUrl: 'images/travel/liverpool.jpg',
    ),
    CardContent(
      title: "2018 Uzbekistan",
      route: "",
      url: "",
      imageUrl: 'images/travel/uzbekistan.jpg',
    ),
    CardContent(
      title: "2017 Portugal",
      route: "",
      url: "",
      imageUrl: 'images/travel/portugal.jpg',
    ),
    CardContent(
      title: "2016 Monza-Roma (by Bike)",
      route: "",
      url: "",
      imageUrl: 'images/travel/monzaroma.jpg',
    ),
    CardContent(
      title: "2014 Puglia (by Bike)",
      route: "",
      url: "",
      imageUrl: 'images/travel/puglia.jpg',
    ),
    CardContent(
      title: "2012-2021 British Isles",
      route: "",
      url: "",
      imageUrl: 'images/travel/uk.jpg',
    ),
  ];
  //#endregion

  //#region HIGHLIGHTS

  static List<CardContent> highlights_cards = [
    travel_cards[2],
    projects_cards[2],
    projects_cards[1],
  ];

//#endregion
}

//#region ABOUT PAGE CLASSES
class ContactContent {

  String text, url;
  IconData icon;

  ContactContent(this.icon, this.text, this.url);
}

class EducationEntryContent {

  String title, institution, date, vote;
  late List<EducationHighlightContent> highlights;

  EducationEntryContent(this.title, this.institution, {this.date='', this.vote='', required highlights}) {
    this.highlights = highlights.map<EducationHighlightContent>((entry) => EducationHighlightContent(entry[0], subtitle: entry.length>1 ? entry[1] : '', url: entry.length>2 ? entry[2] : '')).toList();
  }

}

class EducationHighlightContent {

  String title, subtitle;
  late String url;

  EducationHighlightContent(this.title, {this.subtitle='', this.url=''});
}

//#endregion

//#region PROJECT CLASSES

class CardContent {

  String title, description, imageUrl, url, route;

  CardContent({required this.title, this.description='Coming soon...', this.url='', this.imageUrl='assets/images/paper_flower_overhead_bw_w1080.jpg', this.route='post'});

}

//#endregion