// Add or edit projects here.
//
// To use your own media:
//   1. Put files in /public/media/  (for example public/media/ar-detection.jpg)
//   2. Set  image: 'media/ar-detection.jpg'   (path WITHOUT a leading slash)
//   3. Optionally set  video: 'media/ar-detection.mp4'  to play a clip in the details window.
// While `image` is empty, a drawn placeholder (art: '...') is shown instead.
//
// The `details` and `links` fields are placeholders. Fill in only what is true.
//
// FEATURED PROJECT WITH A GALLERY (see "LEGO Animation" below):
//   size: 'full'      shows the project as a full-width row above the grid
//   film              the video on the card: a file ('media/lego/video.mp4') or a YouTube link
//                     ('https://youtu.be/XXXXXXXXXXX', upload it as Unlisted). Large videos belong on YouTube.
//                     It shows a cover with a play button and only plays when the visitor presses play.
//   image             the cover picture for the film (if empty: the film's first frame, or YouTube's thumbnail)
//   gallery           the photos (and videos, if you like) in the details window. Add, remove or reorder:
//                       { type: 'image', src: 'media/lego/01.jpg', thumb: 'media/lego/01-small.jpg', alt: '...', caption: '...' }
//                       { type: 'video', src: 'media/lego/clip.mp4', poster: 'media/lego/clip.jpg', caption: '...' }
//                     `thumb` is optional (a small version for the thumbnail strip).
//                     An item with an empty `src` shows a labelled placeholder.

export const projects = [
  {
    id: 'lego-animation',
    title: 'LEGO Animation',
    subtitle: 'Realtime 3D course',
    art: 'lego',
    size: 'full',
    summary: 'A short LEGO film created for the Realtime 3D course.',
    description:
      'This project started with the idea of creating a short LEGO film using models from the MetaBricks website. Although we were encouraged to use only a few LEGO models, I decided to create a complete scene from scratch to make the film more visually interesting.\n\nI cleaned up the models, created their UV maps and prepared the textures as PNG files using Adobe Illustrator. I also prepared the animations beforehand and used Unity Timeline to combine everything into a short film.\n\nThis project allowed me to explore 3D modelling, texturing, animation, scene creation and storytelling while combining Blender, Adobe Illustrator and Unity into a single workflow.',
    tech: ['Blender', 'Adobe Illustrator', 'Unity'],
    details: [],
    links: [],

    film: 'media/lego/video.mp4',
    image: '',

    gallery: [
      { type: 'image', src: 'media/lego/Image1.png', alt: '', caption: '' },
      { type: 'image', src: 'media/lego/Image2.png', alt: '', caption: '' },
      { type: 'image', src: 'media/lego/Image3.png', alt: '', caption: '' },
      { type: 'image', src: 'media/lego/Image4.png', alt: '', caption: '' },
      { type: 'image', src: 'media/lego/Image5.png', alt: '', caption: '' },
      { type: 'image', src: 'media/lego/Image6.png', alt: '', caption: '' },
      { type: 'image', src: 'media/lego/Image7.png', alt: '', caption: '' },
      { type: 'image', src: 'media/lego/Image8.png', alt: '', caption: '' },
      { type: 'image', src: 'media/lego/Image9.png', alt: '', caption: '' },
      { type: 'image', src: 'media/lego/Image10.png', alt: '', caption: '' },
    ],
  },
  {
    id: 'ar-object-detection',
    title: 'AR Object Detection',
    subtitle: 'Work in progress',
    art: 'ar',
    size: 'narrow',
    summary:
      'An early prototype for hazard detection: object recognition with YOLO and hands-free hand tracking in a VR headset.',
    description:
      'This project is an ongoing prototype of an application for hazard detection, which we are developing with a VR headset we have available. It uses YOLO to detect around 80 different object classes.\n\nOur goal is to make the application usable hands-free, so we are also working on hand tracking and gesture interaction. We have integrated hand interaction and a menu that can be opened through the arm.\n\nWe have been working on it for about two weeks, so the current version is still basic. We plan to keep improving it and to expand its functionality.',
    tech: ['Unity', 'YOLO', 'Computer Vision', 'Hand Tracking'],
    details: [],
    links: [],

    film: 'media/ar/Video.mp4',
    detailsMedia: false,
  },
  {
    id: 'mosquito-boss',
    title: 'Mosquito Boss',
    subtitle: 'GameJam 2025',
    art: 'mosquito',
    size: 'full',
    summary:
      'My first game built entirely on my own: a playable Unity game made during a 10-day Game Jam.',
    description:
      'This was my first time developing a game entirely on my own. I took part in a 10-day Game Jam as part of my Multimedia Ambassador course in 2025, and I handled the whole project independently: programming, gameplay mechanics, 3D modelling and creating the assets.\n\nWith so little time, I prioritised a game that was functional and playable over visual polish, so some parts of the environment, such as the walls, are simpler than I first planned and a few bugs remain. I still delivered a complete, playable game within the 10-day deadline, and the project taught me a lot about working independently, managing my time, prioritising tasks and taking a game from an initial idea to a playable build.',
    tech: ['Unity', 'C#', 'Blender'],
    details: [
      { label: 'Course', value: 'Multimedia Ambassador' },
      { label: 'Year', value: '2025' },
      { label: 'Duration', value: '10 days' },
    ],
    links: [],

    // TODO: paste your YouTube link here, e.g. 'https://youtu.be/XXXXXXXXXXX'
    film: 'https://www.youtube.com/watch?v=1SIzC9WotYo',
    image: '',

    // The 6 images go in public/media/mosquito/ (Image1.png ... Image6.png)
    gallery: [
      { type: 'image', src: 'media/mosquito/Image1.png', alt: '', caption: '' },
      { type: 'image', src: 'media/mosquito/Image2.png', alt: '', caption: '' },
      { type: 'image', src: 'media/mosquito/Image3.png', alt: '', caption: '' },
      { type: 'image', src: 'media/mosquito/Image4.png', alt: '', caption: '' },
      { type: 'image', src: 'media/mosquito/Image5.png', alt: '', caption: '' },
      { type: 'image', src: 'media/mosquito/Image6.png', alt: '', caption: '' },
      { type: 'image', src: 'media/mosquito/Image7.png', alt: '', caption: '' },
      { type: 'image', src: 'media/mosquito/Image8.png', alt: '', caption: '' },
  
    ],
  },
  {
    id: 'virtual-production',
    title: 'Virtual Production',
    subtitle: 'Videotechniek course',
    art: 'three-d',
    size: 'narrow',
    summary:
      'Real camera footage combined with a virtual train environment, using camera tracking and real-time compositing.',
    description:
      'This project was created for the course Videotechniek: Virtual & Real Life, a collaboration between Audio/Video students and 3D students. The goal was to combine real camera footage with a virtual environment to create a believable scene using Virtual Production techniques.\n\nWe used Aximmetry together with HTC VIVE Mars CamTrack for camera tracking and for integrating the real footage with the virtual environment. The recorded footage was then edited and finalised in DaVinci Resolve. The result creates the illusion that the scene takes place inside a virtual location, in this case a train environment.\n\nThis project gave me experience with Virtual Production workflows, camera tracking, real-time compositing and combining real footage with virtual environments.',
    tech: ['Aximmetry', 'HTC VIVE Mars CamTrack', 'DaVinci Resolve', 'Virtual Production'],
    details: [
      { label: 'Course', value: 'Videotechniek: Virtual & Real Life' },
      { label: 'Type', value: 'Virtual Production' },
    ],
    links: [],

    film: 'media/virtual-production/video.mp4',
    detailsMedia: false,
  },
  {
    id: '3d-experiments',
    title: 'Personal 3D Projects',
    art: 'three-d',
    size: 'narrow',
    summary:
      'A collection of personal Blender projects created in my free time, exploring environment modelling, character design, hair modelling and materials.',
    description:
      'A collection of personal Blender projects created in my free time, exploring environment modelling, character design, hair modelling and materials.',
    tech: ['Blender', '3D Modelling', 'Character Design', 'Environment Modelling'],
    details: [],
    links: [],

    image: 'media/3d/Image1.png',
    fit: 'contain',

    gallery: [
      { type: 'image', src: 'media/3d/Image1.png', alt: 'Basketball court environment', caption: 'Basketball court environment' },
      { type: 'image', src: 'media/3d/Image2.png', alt: 'Character modelling experiments', caption: 'Character modelling experiments' },
      { type: 'image', src: 'media/3d/Image3.png', alt: 'Hair and beard modelling', caption: 'Hair and beard modelling' },
      { type: 'image', src: 'media/3d/Image4.png', alt: 'Monster / mascot modelling', caption: 'Monster / mascot modelling' },
      { type: 'image', src: 'media/3d/Image5.png', alt: 'Material and shader experiments', caption: 'Material and shader experiments' },
      { type: 'image', src: 'media/3d/Image6.png', alt: 'Personal 3D project', caption: 'Personal 3D project' },
      { type: 'image', src: 'media/3d/Image7.png', alt: 'Personal 3D project', caption: 'Personal 3D project' },
      { type: 'image', src: 'media/3d/Image8.png', alt: 'Personal 3D project', caption: 'Personal 3D project' },
      { type: 'image', src: 'media/3d/Image9.png', alt: 'Personal 3D project', caption: 'Personal 3D project' },
      { type: 'image', src: 'media/3d/Image10.png', alt: 'Personal 3D project', caption: 'Personal 3D project' },
    ],
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    subtitle: 'Course project',
    art: 'three-d',
    size: 'narrow',
    summary:
      'A collection of motion graphics projects created during a course, exploring animation, visual design and motion.',
    description:
      'A collection of motion graphics projects created during a course, exploring animation, visual design and motion.\n\nThe coursework also included Hula Loop animations, which were created as part of the assignments.',
    tech: ['After Effects', 'Adobe Illustrator', 'Motion Graphics'],
    details: [],
    links: [],

    film: 'media/motion/compilation.mp4',

    gallery: [
      { type: 'video', src: 'media/motion/video1.mp4', caption: 'Motion graphics 1' },
      { type: 'video', src: 'media/motion/video2.mp4', caption: 'Motion graphics 2' },
      { type: 'video', src: 'media/motion/video3.mp4', caption: 'Motion graphics 3' },
      { type: 'video', src: 'media/motion/video4.mp4', caption: 'Motion graphics 4' },
      { type: 'video', src: 'media/motion/video5.mp4', caption: 'Motion graphics 5' },
      { type: 'video', src: 'media/motion/video6.mp4', caption: 'Motion graphics 6' },
      { type: 'video', src: 'media/motion/video7.mp4', caption: 'Motion graphics 7' },
      { type: 'video', src: 'media/motion/video8.mp4', caption: 'Motion graphics 8' },
    ],
  },
    {
    id: 'prototyping-portfolio',
    title: 'Prototyping Portfolio',
    art: 'three-d',
    size: 'narrow',
    summary:
      'A collection of prototyping, 3D modelling, product design and Arduino projects developed throughout the academic year.',
    description:
      'A collection of prototyping, 3D modelling, product design and Arduino projects developed throughout the academic year.',
    tech: ['Prototyping', '3D Modelling', 'Product Design', 'Arduino'],
    details: [],
    links: [],

    pdf: 'media/prototyping/portfolio.pdf',
    fit: 'contain',
  },
  {
    id: 'post-production',
    title: 'Audio & Video Post-production',
    art: 'three-d',
    size: 'narrow',
    summary:
      'A collection of video editing and post-production projects created throughout my studies, exploring different editing techniques, visual storytelling and audio-visual production.',
    description:
      'This project represents the audio and video post-production work I completed throughout my studies. During these assignments, I experimented with different video editing techniques, editing styles, visual storytelling and audio integration.\n\nAlthough audio and video post-production is not my main specialization, these projects allowed me to gain experience with video editing and Adobe Premiere Pro, while exploring different approaches to creating and editing audiovisual content.\n\nTogether with my other technical and creative projects, this work shows that I also have experience with video editing and post-production.',
    tech: ['Video Editing', 'Adobe Premiere Pro', 'Post-production', 'Audio & Video'],
    details: [],
    links: [],

    film: 'media/post-production/video1.mp4',

    gallery: [
      { type: 'video', src: 'media/post-production/video1.mp4', caption: 'Video 1' },
      { type: 'video', src: 'media/post-production/video2.mp4', caption: 'Video 2' },
      { type: 'video', src: 'media/post-production/video3.mp4', caption: 'Video 3' },
    ],
  },
]