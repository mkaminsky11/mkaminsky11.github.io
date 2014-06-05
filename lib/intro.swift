import UIKit

class RootViewController: UIViewController {

    override func viewDidLoad() {
        var button: UIButton = UIButton.buttonWithType(UIButtonType.System) as UIButton
        button.frame = CGRectMake(10, 10, 300, 60)
        button.setTitle("Show", forState: UIControlState.Normal)
        button.addTarget(self, action: "showButtonTouchUpInside", forControlEvents: UIControlEvents.TouchUpInside)
        self.view.addSubview(button)
    }

    func showButtonTouchUpInside() {
        JLToast.makeText("Basic JLToast").show()
        JLToast.makeText("You can set duration. `JLToastDelay.ShortDelay` means 2 seconds." +
                         "`JLToastDelay.LongDelay` means 3.5 seconds.", duration: JLToastDelay.LongDelay).show()
        JLToast.makeText("With delay, JLToast will be shown after delay.", delay: 1, duration: 5)
    }
}
