# Implementation Plan - Visual & Interactive Overhaul

[Overview]
The goal is to transform the website's visual experience from "dull" to "mind-blowing" by implementing a high-fidelity 3D background, integrating the new logo as a dynamic 3D element, and enhancing global transitions and scroll effects.

This implementation will replace the basic particle background with an immersive, interactive 3D circuit environment using Three.js (via React Three Fiber). The new logo will be converted into a 3D asset and integrated into the scene. Global page transitions will be synchronized with 3D camera movements to create seamless navigation. Post-processing effects like Bloom and Chromatic Aberration will be added for visual polish.

[Types]
No major type system changes are expected, but new interfaces for 3D components and animation props will be defined.

- `CircuitSceneProps`: Props for the main 3D scene configuration (color theme, intensity).
- `Logo3DProps`: Props for the 3D logo component (scale, position, wireframe mode).
- `TransitionState`: Type definition for managing transition states between 3D and DOM elements.

[Files]
- **New Files:**
    - `src/components/ui/ImmersiveBackground.tsx`: The new high-end 3D background component replacing `DynamicBackground`.
    - `src/components/3d/Logo3D.tsx`: A 3D representation of the new logo using `ExtrudeGeometry` from the SVG paths.
    - `src/components/3d/CircuitEnvironment.tsx`: Component for generating procedural circuit lines and floating elements.
    - `src/components/effects/PostProcessingEffects.tsx`: Wrapper for React Three Postprocessing effects.

- **Modified Files:**
    - `src/app/layout.tsx`: Replace `DynamicBackground` with `ImmersiveBackground`.
    - `src/components/BrandLogo.tsx`: Update to optionally render the animated SVG or 3D version.
    - `src/components/PageTransition.tsx`: Enhance transitions to trigger 3D effects (e.g., camera warp).
    - `src/hooks/useSmoothScroll.ts`: Expose scroll velocity and progress to the 3D scene.

- **Deleted Files:**
    - `src/components/ui/DynamicBackground.tsx`: (Optional) Keep as fallback or delete if fully replaced.

[Functions]
- **New Functions:**
    - `useLogoGeometry(svgContent: string)`: Hook to parse SVG and return Three.js geometry.
    - `useCircuitAnimation()`: Hook to drive circuit line animations based on time and scroll.
    - `CameraRig()`: Component to handle complex camera movements responsive to mouse and scroll.

- **Modified Functions:**
    - `PageTransition`: Add callbacks to trigger 3D scene transitions.
    - `BrandLogo`: Add logic to switch between static image and animated SVG/3D.

[Classes]
No new classes. Functional components and hooks will be used.

[Dependencies]
- Ensure `@react-three/drei` and `@react-three/postprocessing` are installed and compatible (already in `package.json`).
- No new external packages required.

[Testing]
- Visual regression testing (manual) to ensure the 3D scene doesn't block content.
- Performance testing using `r3f-perf` (if available) or browser dev tools to ensure 60fps on average devices.
- Accessibility check: Ensure 3D background respects `prefers-reduced-motion`.

[Implementation Order]
1.  **3D Logo Creation:** Create `Logo3D.tsx` by parsing the provided SVG and extruding it into a 3D mesh.
2.  **Immersive Background:** Build `ImmersiveBackground.tsx` with the `CircuitEnvironment` and integrate the `Logo3D`.
3.  **Post-Processing:** Add `PostProcessingEffects` (Bloom, Noise) to the scene.
4.  **Integration:** Replace the background in `layout.tsx`.
5.  **Scroll & Interaction:** Connect `useSmoothScroll` to the 3D camera and elements.
6.  **Transition Polish:** Update `PageTransition.tsx` to sync with the 3D scene.
