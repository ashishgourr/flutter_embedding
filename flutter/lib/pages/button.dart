import 'package:flutter/material.dart';
import 'package:gluestack_ui/gluestack_ui.dart';

class ButtonExample extends StatefulWidget {
  final ValueNotifier<String> buttonVariant;
  final ValueNotifier<String> buttonAction;
  final ValueNotifier<String> buttonSize;
  final ValueNotifier<bool> isButtonDisabled;
  final ValueNotifier<bool> isButtonFocused;

  const ButtonExample({
    super.key,
    required this.buttonVariant,
    required this.buttonAction,
    required this.buttonSize,
    required this.isButtonDisabled,
    required this.isButtonFocused,
  });

  @override
  State<ButtonExample> createState() => _ButtonExampleState();
}

class _ButtonExampleState extends State<ButtonExample> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final theme = GSTheme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: Center(
        child: ValueListenableBuilder(
          builder: (BuildContext context, value, Widget? child) {
            bool isButtonFocused = value;
            return ValueListenableBuilder(
              builder: (BuildContext context, value, Widget? child) {
                bool isButtonDisabled = value;
                return ValueListenableBuilder(
                  builder: (BuildContext context, value, Widget? child) {
                    GSButtonSizes buttonSize = setButtonSize(value);
                    return ValueListenableBuilder(
                      builder: (BuildContext context, value, Widget? child) {
                        GSButtonActions buttonAction = setButtonAction(value);
                        return ValueListenableBuilder(
                          builder:
                              (BuildContext context, value, Widget? child) {
                            GSButtonVariants buttonVariant =
                                setButtonVariant(value);

                            return GSButton(
                              action: buttonAction,
                              variant: buttonVariant,
                              size: buttonSize,
                              isDisabled: isButtonDisabled,
                              isFocusVisible: isButtonFocused,
                              onPressed: () {},
                              child: const GSButtonText(text: "GSButton"),
                            );
                          },
                          valueListenable: widget.buttonVariant,
                        );
                      },
                      valueListenable: widget.buttonAction,
                    );
                  },
                  valueListenable: widget.buttonSize,
                );
              },
              valueListenable: widget.isButtonDisabled,
            );
          },
          valueListenable: widget.isButtonFocused,
        ),
      ),
    );
  }

  GSButtonVariants setButtonVariant(String value) {
    switch (value) {
      case 'solid':
        return GSButtonVariants.solid;
      case 'outline':
        return GSButtonVariants.outline;
      case 'link':
        return GSButtonVariants.link;
      default:
        return GSButtonVariants.solid;
    }
  }

  GSButtonActions setButtonAction(String value) {
    switch (value) {
      case 'primary':
        return GSButtonActions.primary;
      case 'secondary':
        return GSButtonActions.secondary;
      case 'positive':
        return GSButtonActions.positive;
      case 'negative':
        return GSButtonActions.negative;
      default:
        return GSButtonActions.primary;
    }
  }

  GSButtonSizes setButtonSize(String value) {
    switch (value) {
      case "\$xs":
        return GSButtonSizes.$xs;
      case "\$sm":
        return GSButtonSizes.$sm;
      case "\$md":
        return GSButtonSizes.$md;
      case "\$lg":
        return GSButtonSizes.$lg;
      default:
        return GSButtonSizes.$md;
    }
  }
}
