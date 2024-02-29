import 'package:flutter/material.dart';
import 'package:gluestack_ui/gluestack_ui.dart';

import 'pages/button.dart';

import 'src/js_interop.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final ValueNotifier<DemoScreen> _screen =
      ValueNotifier<DemoScreen>(DemoScreen.button);
  final ValueNotifier<String> _variant = ValueNotifier<String>('');
  final ValueNotifier<String> _action = ValueNotifier<String>('');
  final ValueNotifier<String> _size = ValueNotifier<String>('');
  final ValueNotifier<bool> _disable = ValueNotifier<bool>(false);
  final ValueNotifier<bool> _focus = ValueNotifier<bool>(false);

  late final DemoAppStateManager _state;

  @override
  void initState() {
    super.initState();
    _state = DemoAppStateManager(
      screen: _screen,
      variant: _variant,
      action: _action,
      size: _size,
      disable: _disable,
      focus: _focus,
    );
    final export = createJSInteropWrapper(_state);

    // Emit this through the root object of the flutter app :)
    broadcastAppEvent('flutter-initialized', export);
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GluestackProvider(
        gluestackTokenConfig: GluestackTokenConfig(),
        child: GSApp(
          debugShowCheckedModeBanner: false,
          color: $GSColors.primary500,
          localizationsDelegates: const [
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          darkTheme: GSThemeData(
            brightness: Brightness.dark,
          ),
          theme: GSThemeData(),
          home: ValueListenableBuilder<DemoScreen>(
            valueListenable: _screen,
            builder: (context, value, child) => ButtonExample(
              buttonVariant: _variant,
              buttonAction: _action,
              buttonSize: _size,
              isButtonDisabled: _disable,
              isButtonFocused: _focus,
            ),
          ),
        ));
  }

  Widget demoScreenRouter(DemoScreen which) {
    switch (which) {
      case DemoScreen.button:
        return ButtonExample(
          buttonVariant: _variant,
          buttonAction: _action,
          buttonSize: _size,
          isButtonDisabled: _disable,
          isButtonFocused: _focus,
        );
    }
  }
}
