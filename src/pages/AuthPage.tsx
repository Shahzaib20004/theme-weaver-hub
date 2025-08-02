import React, { useState } from 'react'
import { FlexibleAuth } from '@/components/Auth/FlexibleAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import { auth } from '@/integrations/supabase/client'

export const AuthPage: React.FC = () => {
  const [userType, setUserType] = useState<'customer' | 'dealership'>('customer')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const navigate = useNavigate()

  const handleAuthSuccess = (user: any) => {
    setIsAuthenticated(true)
    setCurrentUser(user)
    
    if (user) {
      // Redirect based on user type
      if (userType === 'dealership') {
        navigate('/dealership/dashboard')
      } else {
        navigate('/dashboard')
      }
    } else {
      // Guest user - continue without login
      navigate('/cars')
    }
  }

  const handleAuthError = (error: string) => {
    console.error('Authentication error:', error)
    // You can show a toast notification here
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      setIsAuthenticated(false)
      setCurrentUser(null)
      navigate('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            گاڑی کرایہ پلیٹ فارم
          </h1>
          <p className="text-lg text-gray-600">
            اپنی گاڑی تلاش کریں یا اپنی گاڑی کرایہ پر دیں
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">صارفین کے لیے</CardTitle>
              <CardDescription className="text-center">
                گاڑیاں تلاش کریں اور کرایہ پر لیں
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={userType} onValueChange={(value) => setUserType(value as 'customer' | 'dealership')}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="customer">صارف</TabsTrigger>
                  <TabsTrigger value="dealership">ڈیلرشپ</TabsTrigger>
                </TabsList>
                
                <TabsContent value="customer">
                  <FlexibleAuth
                    userType="customer"
                    isOptional={true}
                    onSuccess={handleAuthSuccess}
                    onError={handleAuthError}
                  />
                </TabsContent>
                
                <TabsContent value="dealership">
                  <FlexibleAuth
                    userType="dealership"
                    isOptional={false}
                    onSuccess={handleAuthSuccess}
                    onError={handleAuthError}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">خصوصیات</CardTitle>
              <CardDescription className="text-center">
                ہمارے پلیٹ فارم کی اہم خصوصیات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">آسان استعمال</h3>
                    <p className="text-sm text-gray-600">
                      بغیر لاگ ان کے بھی گاڑیاں دیکھ سکتے ہیں
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">فون یا ای میل</h3>
                    <p className="text-sm text-gray-600">
                      فون نمبر یا ای میل سے سائن اپ کریں
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">فوری رابطہ</h3>
                    <p className="text-sm text-gray-600">
                      ڈیلرشپ سے براہ راست رابطہ کریں
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">واٹس ایپ</h3>
                    <p className="text-sm text-gray-600">
                      واٹس ایپ پر فوری پیغام بھیجیں
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">فوری نوٹیفیکیشن</h3>
                    <p className="text-sm text-gray-600">
                      SMS اور ای میل کے ذریعے فوری اطلاع
                    </p>
                  </div>
                </div>
              </div>

              {isAuthenticated && currentUser && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    خوش آمدید!
                  </h3>
                  <p className="text-sm text-green-700 mb-3">
                    آپ کامیابی سے لاگ ان ہو گئے ہیں
                  </p>
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    لاگ آؤٹ کریں
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            فوری طور پر شروع کرنے کے لیے
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/cars')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              گاڑیاں دیکھیں
            </Button>
            <Button 
              onClick={() => navigate('/dealerships')}
              variant="outline"
            >
              ڈیلرشپس دیکھیں
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}