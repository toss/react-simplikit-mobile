import { useScrollDirection } from '@react-simplikit/mobile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { DemoLayout } from '../../components/DemoLayout.tsx';

export function UseScrollDirectionDemo() {
  const { direction, position } = useScrollDirection({ throttleMs: 50 });

  const isHidden = direction === 'down' && position > 100;

  return (
    <div>
      {/* Fixed Navigation Bar */}
      <nav
        className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50 transition-transform duration-300"
        style={{
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Demo Navigation</h1>
          <div className="text-sm font-semibold">
            {direction === 'down' && '⬇️ Down'}
            {direction === 'up' && '⬆️ Up'}
            {direction === null && '—'}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        <DemoLayout
          title="useScrollDirection"
          description="Auto-hide navigation bar on scroll down, show on scroll up"
        >
          <div className="space-y-6 pb-32">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Scroll State</CardTitle>
                <CardDescription>Real-time scroll direction and position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Direction:</span>
                  <span className="font-mono">{direction || 'none'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Position:</span>
                  <span className="font-mono">{Math.round(position)}px</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Nav Hidden:</span>
                  <span className={isHidden ? 'text-red-600' : 'text-green-600'}>
                    {isHidden ? 'Yes' : 'No'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>How it works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Scroll down the page - the navigation bar will hide</li>
                    <li>Scroll up - the navigation bar will reappear</li>
                    <li>The effect only activates after scrolling past 100px</li>
                  </ol>
                </div>

                <div className="p-4 border-l-4 border-blue-600 bg-gray-50">
                  <p className="text-sm">
                    <strong>💡 Use Case:</strong> This pattern is commonly used in mobile apps to
                    maximize screen real estate. The navigation hides when scrolling down (reading
                    mode) and appears when scrolling up (likely to navigate).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Demo Sections */}
            {[1, 2, 3, 4, 5].map((num) => (
              <Card key={num} className="min-h-[400px]">
                <CardHeader>
                  <CardTitle>Section {num}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Keep scrolling to see more sections and test the auto-hide navigation.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Current direction: <strong>{direction || 'none'}</strong></p>
                    <p>Current position: <strong>{Math.round(position)}px</strong></p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Code Example */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation Code</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                  <code>{`import { useScrollDirection } from '@react-simplikit/mobile';

function Header() {
  const { direction, position } = useScrollDirection();

  // Hide header on scroll down (after 100px threshold)
  const isHidden = direction === 'down' && position > 100;

  return (
    <nav
      style={{
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 300ms',
      }}
    >
      <h1>My Header</h1>
    </nav>
  );
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </DemoLayout>
      </div>
    </div>
  );
}
