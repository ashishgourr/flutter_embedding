import 'package:flutter/foundation.dart';
import 'dart:js_interop';

enum DemoScreen {
  button('button');

  const DemoScreen(String screen) : _screen = screen;
  final String _screen;

  @override
  String toString() => _screen;
}

/// This is the bit of state that JS is able to see.
///
/// It contains getters/setters/operations and a mechanism to
/// subscribe to change notifications from an incoming [notifier].
@JSExport()
class DemoAppStateManager {
  // Creates a DemoAppStateManager wrapping a ValueNotifier.
  DemoAppStateManager({
    required ValueNotifier<DemoScreen> screen,
    required ValueNotifier<String> variant,
    required ValueNotifier<String> action,
    required ValueNotifier<String> size,
    required ValueNotifier<bool> disable,
    required ValueNotifier<bool> focus,
  })  : _variant = variant,
        _action = action,
        _size = size,
        _screen = screen,
        _disable = disable,
        _focus = focus;

  final ValueNotifier<DemoScreen> _screen;
  final ValueNotifier<String> _variant;
  final ValueNotifier<String> _action;
  final ValueNotifier<String> _size;
  final ValueNotifier<bool> _disable;
  final ValueNotifier<bool> _focus;

  // Button variants

  void setVariant(String text) {
    _variant.value = text;
  }

  String getVariant() {
    return _variant.value;
  }

  // Button actions

  void setAction(String text) {
    _action.value = text;
  }

  String getAction() {
    return _action.value;
  }

  // Button size

  void setSize(String text) {
    _size.value = text;
  }

  String getSize() {
    return _size.value;
  }

  //Button disabled

  void setDisabled(bool disable) {
    _disable.value = disable;
  }

  bool getDisabled() {
    return _disable.value;
  }

  //Button focused

  void setFocused(bool focus) {
    _focus.value = focus;
  }

  bool getFocused() {
    return _focus.value;
  }

  // _screen
  void setScreen(String screen) {
    _screen.value = DemoScreen.values.byName(screen);
  }

  String getScreen() {
    return _screen.value.toString();
  }

  void onVariantChanged(Function(String) f) {
    _variant.addListener(() {
      f(getVariant());
    });
  }

  void onActionChanged(Function(String) f) {
    _action.addListener(() {
      f(getAction());
    });
  }

  void onSizeChanged(Function(String) f) {
    _size.addListener(() {
      f(getSize());
    });
  }

  void onDisabledChanged(Function(bool) f) {
    _disable.addListener(() {
      f(getDisabled());
    });
  }

  void onFocusedChanged(Function(bool) f) {
    _focus.addListener(() {
      f(getFocused());
    });
  }

  void onScreenChanged(Function(String) f) {
    _screen.addListener(() {
      f(getScreen());
    });
  }
}
