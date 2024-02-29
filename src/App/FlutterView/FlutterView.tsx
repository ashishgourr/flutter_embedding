import React, { useEffect, useRef, memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// The global _flutter namespace
declare var _flutter: any;

const divStyle: React.CSSProperties = {
  height: "100%",
  width: "100%",
};

interface FlutterViewProps {
  assetBase?: string;
  src?: string;
  onScreenChange?: (screen: string) => void;
  onActionChange?: (action: string) => void;
  onVariantChange?: (variant: string) => void;
  onSizeChange?: (size: string) => void;
  onDisabledChange?: (disabled: boolean) => void;
  onFocusedChange?: (focused: boolean) => void;

  variant: string;
  action: string;
  size: string;
  screen: string;
  disabled: boolean;
  focused: boolean;
}

export const FlutterView: React.FC<FlutterViewProps> = memo(
  ({
    assetBase = "",
    src = "main.dart.js",
    onScreenChange,
    onActionChange,
    onVariantChange,
    onSizeChange,
    onDisabledChange,
    onFocusedChange,
    variant,
    action,
    size,
    screen,
    disabled,
    focused,
  }) => {
    const flutterState = useRef<any>(null);
    const ref = useRef<HTMLDivElement>(null);

    const onFlutterAppLoaded = (state: any) => {
      flutterState.current = state;
      // listen to state changes
      state.onVariantChanged(onVariantChange);
      state.onActionChanged(onActionChange);
      state.onSizeChanged(onSizeChange);
      state.onScreenChanged(onScreenChange);
      state.onFocusedChanged(onFocusedChange);
      state.onDisabledChanged(onDisabledChange);

      // set initial values
      state.setVariant(variant);
      state.setAction(action);
      state.setSize(size);
      state.setScreen(screen);
      state.setFocused(focused);
      state.setDisabled(disabled);
    };

    useEffect(() => {
      const target = ref.current;
      let isRendered = true;
      const initFlutterApp = async () => {
        if (!isRendered) return;
        const engineInitializer = await new Promise<any>((resolve) => {
          console.log("setup Flutter engine initializer...");
          _flutter.loader.loadEntrypoint({
            entrypointUrl: src,
            onEntrypointLoaded: resolve,
          });
        });
        if (!isRendered) return;

        console.log("initialize Flutter engine...");
        const appRunner = await engineInitializer?.initializeEngine({
          hostElement: target,
          assetBase: assetBase,
        });
        if (!isRendered) return;

        console.log("run Flutter engine...");
        await appRunner?.runApp();
      };
      initFlutterApp();

      const eventListener = (event: Event) => {
        let state = (event as CustomEvent).detail;
        onFlutterAppLoaded(state);
      };

      target?.addEventListener("flutter-initialized", eventListener, {
        once: true,
      });

      return () => {
        isRendered = false;
        target?.removeEventListener("flutter-initialized", eventListener);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      flutterState.current?.setVariant(variant);
    }, [variant]);
    useEffect(() => {
      flutterState.current?.setAction(action);
    }, [action]);
    useEffect(() => {
      flutterState.current?.setSize(size);
    }, [size]);
    useEffect(() => {
      flutterState.current?.setScreen(screen);
    }, [screen]);
    useEffect(() => {
      flutterState.current?.setDisabled(disabled);
    }, [disabled]);
    useEffect(() => {
      flutterState.current?.setFocused(focused);
    }, [focused]);

    return (
      <div ref={ref} style={divStyle}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      </div>
    );
  }
);
