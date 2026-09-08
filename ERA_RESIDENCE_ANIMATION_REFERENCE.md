# ERA Residence — Animation Reference

Source reviewed: [era-residence.com](https://www.era-residence.com/)  
Reviewed: 4 September 2026

## Motion character

ERA Residence uses a **cinematic real-estate editorial** motion language. It makes scrolling feel less like moving through separate blocks of content and more like progressing through a carefully directed film sequence.

The pace is unhurried and immersive. Elements rarely snap into view or bounce. Instead, scenes hold long enough to establish a mood, then transition through depth, masking, slow image movement, and refined typography. The site prioritises atmosphere, spatial scale, and the sense of travelling through a place.

## Observed animation system

The site loads and uses:

- GSAP with ScrollTrigger for scroll-linked motion and pinned scenes
- Lenis for eased, momentum-like smooth scrolling
- GSAP SplitText for character, word, and line-level typography reveals
- Lottie for selected vector motion
- Barba for page transitions

## Core patterns

### 1. Long, sticky visual chapters

The opening experience is an extended sticky scene rather than a conventional hero followed immediately by content. The viewport stays occupied by full-bleed architecture and landscape imagery while scroll progress advances the scene.

Observed qualities:

- The visual background changes across the scroll duration, creating a guided tour effect.
- Image layers move at different vertical rates, producing depth without feeling like a generic parallax effect.
- The scene uses a fixed/sticky composition, so the page scroll feels like controlling a camera move.
- Large amounts of vertical scroll are dedicated to one visual idea before the next content chapter begins.

**Style:** cinematic, architectural, slow, immersive, high-end.

### 2. Section transitions as scene changes

The site treats each major content area as a scene. Instead of independently animating every card, a whole visual field enters, holds, and exits.

Observed qualities:

- Full-bleed photography acts as a transition surface between text-led chapters.
- Sections use clipping/masking and generous empty space to make the next scene feel deliberately introduced.
- A new background colour or image establishes the chapter before dense content appears.
- The transition is driven by scroll position, not by a fixed-duration entrance animation.

**Style:** editorial sequencing; quiet, deliberate, spatial.

### 3. Slow image parallax and camera-like travel

Large photos do not remain static. They travel gradually as the user scrolls, often within an extended sticky region.

Observed qualities:

- Background and foreground layers shift separately.
- Vertical image translation is restrained, preserving the premium, photographic feel.
- Scale and cropping change subtly, like a slow digital dolly or pan rather than an obvious animation.
- Image movement is synced to scroll, so users feel in control of the pace.

**Style:** calm, tactile, cinematic; more “camera movement” than “effect.”

### 4. Editorial type reveals

Headlines and labels are treated as motion objects, especially on intro and transition moments.

Observed qualities:

- Text is split into lines, words, or individual characters.
- Characters can rotate in 3D, rise from a mask, and fade into place.
- Reveals are tightly masked so the type appears to emerge from behind an invisible edge.
- Small uppercase navigation and labels remain restrained while display type gets the more expressive treatment.

**Style:** luxury editorial; precise, typographic, never playful.

### 5. Persistent wayfinding

The site keeps visual orientation during long scroll scenes.

Observed qualities:

- A fixed circular brand mark remains present.
- A fixed navigation cluster stays at the upper-right.
- A slim vertical scroll cue and changing numeric counter communicate progression.
- Navigation colour/theme changes with the background for contrast.

**Style:** gallery signage or architectural wayfinding—functional, minimal, and integrated with the visual system.

### 6. Preloader and page-transition polish

The loading state is designed as part of the brand experience rather than a utility screen.

Observed implementation cues include a branded preloader, split text, a progress fill, and decorative architectural background layers. Page transitions are supported by Barba.

**Style:** ceremonial but controlled; it signals craft before the site begins.

## Visual ingredients that support the motion

- Full-bleed Mediterranean photography with slow, controlled movement
- Seriffed display type paired with compact uppercase sans-serif labels
- Light stone, pale sky blue, deep charcoal, and warm natural photographic tones
- Hairline rules, sparse numerical markers, circular emblem details
- Large negative space around statements and images
- Very little UI chrome beyond persistent orientation controls

## How to apply this direction to another portfolio

Use the approach as a **section-level motion system**, not a collection of isolated effects:

1. Let each major section arrive as one composed scene, with a small vertical offset, subtle scale shift, and scroll-scrubbed opacity change.
2. Use a long sticky hero only when it has a meaningful visual story—such as changing project imagery, work phases, or a moving portrait/graphic environment.
3. Keep parallax shallow. A 4–12% travel range is usually enough; the reference avoids aggressive movement.
4. Reserve SplitText-style reveals for a few key display headlines, not all body copy.
5. Add a fixed visual cue—such as a section number, progress line, or compact navigation—to help the user feel oriented through longer scenes.
6. Preserve `prefers-reduced-motion` so the content remains accessible without scroll-linked transforms.

## Avoid when borrowing the style

- Fast zooms, elastic easing, or bouncy card entrances
- Animating every small component independently
- Large parallax offsets that expose empty gaps between sections
- Long pinned scenes with no change in visual story
- Heavy motion over body copy, forms, or essential navigation

The central lesson is to make the **page itself** move like an editorial sequence: composed, slow, image-led, and intentional.
