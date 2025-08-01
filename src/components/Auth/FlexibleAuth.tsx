import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Phone, Eye, EyeOff, User, Lock } from 'lucide-react'
import { auth, validatePakistaniPhone } from '@/integrations/supabase/client'

interface FlexibleAuthProps {
  onSuccess?: (user: any) => void
  onError?: (error: string) => void
  isOptional?: boolean
  userType?: 'customer' | 'dealership'
}

export const FlexibleAuth: React.FC<FlexibleAuthProps> = ({
  onSuccess,
  onError,
  isOptional = false,
  userType = 'customer'
}) => {
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup')
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    userType: userType
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const validateForm = () => {
    if (authMethod === 'email') {
      if (!formData.email) {
        setError('ای میل درج کریں')
        return false
      }
      if (!formData.email.includes('@')) {
        setError('درست ای میل درج کریں')
        return false
      }
    } else {
      if (!formData.phone) {
        setError('فون نمبر درج کریں')
        return false
      }
      if (!validatePakistaniPhone(formData.phone)) {
        setError('درست پاکستانی فون نمبر درج کریں')
        return false
      }
    }

    if (authMode === 'signup') {
      if (!formData.name) {
        setError('نام درج کریں')
        return false
      }
      if (!formData.password) {
        setError('پاس ورڈ درج کریں')
        return false
      }
      if (formData.password.length < 4) {
        setError('پاس ورڈ کم از کم 4 حروف ہونا چاہیے')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError('پاس ورڈز مماثل نہیں ہیں')
        return false
      }
    } else {
      if (!formData.password) {
        setError('پاس ورڈ درج کریں')
        return false
      }
    }

    return true
  }

  const handleSignUp = async () => {
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      const userData = {
        name: formData.name,
        user_type: formData.userType,
        created_at: new Date().toISOString()
      }

      let result
      if (authMethod === 'email') {
        result = await auth.signUpWithEmail(formData.email, formData.password, userData)
      } else {
        result = await auth.signUpWithPhone(formData.phone, formData.password, userData)
      }

      if (result.user) {
        onSuccess?.(result.user)
        setError('')
      }
    } catch (err: any) {
      const errorMessage = err.message || 'سائن اپ میں خرابی'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async () => {
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      let result
      if (authMethod === 'email') {
        result = await auth.signInWithEmail(formData.email, formData.password)
      } else {
        result = await auth.signInWithPhone(formData.phone, formData.password)
      }

      if (result.user) {
        onSuccess?.(result.user)
        setError('')
      }
    } catch (err: any) {
      const errorMessage = err.message || 'لاگ ان میں خرابی'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSendOTP = async () => {
    if (!formData.phone || !validatePakistaniPhone(formData.phone)) {
      setError('درست پاکستانی فون نمبر درج کریں')
      return
    }

    setLoading(true)
    setError('')

    try {
      await auth.signInWithOTP(formData.phone)
      setOtpSent(true)
      setError('')
    } catch (err: any) {
      const errorMessage = err.message || 'OTP بھیجنے میں خرابی'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otpCode || otpCode.length < 4) {
      setError('درست OTP درج کریں')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await auth.verifyOTP(formData.phone, otpCode)
      if (result.user) {
        onSuccess?.(result.user)
        setError('')
      }
    } catch (err: any) {
      const errorMessage = err.message || 'OTP تصدیق میں خرابی'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (authMode === 'signup') {
      handleSignUp()
    } else {
      handleSignIn()
    }
  }

  if (isOptional && userType === 'customer') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">اختیاری لاگ ان</CardTitle>
          <CardDescription className="text-center">
            آپ بغیر لاگ ان کے بھی گاڑیاں دیکھ سکتے ہیں
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => onSuccess?.(null)} 
            className="w-full"
            variant="outline"
          >
            بغیر لاگ ان کے جاری رکھیں
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                یا
              </span>
            </div>
          </div>

          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'signup' | 'signin')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">سائن اپ</TabsTrigger>
              <TabsTrigger value="signin">لاگ ان</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">نام</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="اپنا نام درج کریں"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>رابطہ کا طریقہ</Label>
                  <Select value={authMethod} onValueChange={(value) => setAuthMethod(value as 'email' | 'phone')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">ای میل</SelectItem>
                      <SelectItem value="phone">فون نمبر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {authMethod === 'email' ? (
                  <div className="space-y-2">
                    <Label htmlFor="email">ای میل</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="phone">فون نمبر</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0300 1234567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">پاس ورڈ</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="پاس ورڈ درج کریں"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">پاس ورڈ کی تصدیق</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="پاس ورڈ دوبارہ درج کریں"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  سائن اپ کریں
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>رابطہ کا طریقہ</Label>
                  <Select value={authMethod} onValueChange={(value) => setAuthMethod(value as 'email' | 'phone')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">ای میل</SelectItem>
                      <SelectItem value="phone">فون نمبر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {authMethod === 'email' ? (
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">ای میل</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="signin-phone">فون نمبر</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-phone"
                        type="tel"
                        placeholder="0300 1234567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signin-password">پاس ورڈ</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="پاس ورڈ درج کریں"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  لاگ ان کریں
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    )
  }

  // For dealerships or required authentication
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {userType === 'dealership' ? 'ڈیلرشپ لاگ ان' : 'لاگ ان'}
        </CardTitle>
        <CardDescription className="text-center">
          {userType === 'dealership' 
            ? 'اپنے ڈیلرشپ اکاؤنٹ میں لاگ ان کریں'
            : 'اپنے اکاؤنٹ میں لاگ ان کریں'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'signup' | 'signin')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">سائن اپ</TabsTrigger>
            <TabsTrigger value="signin">لاگ ان</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">نام</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="اپنا نام درج کریں"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>رابطہ کا طریقہ</Label>
                <Select value={authMethod} onValueChange={(value) => setAuthMethod(value as 'email' | 'phone')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">ای میل</SelectItem>
                    <SelectItem value="phone">فون نمبر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {authMethod === 'email' ? (
                <div className="space-y-2">
                  <Label htmlFor="email">ای میل</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone">فون نمبر</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0300 1234567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">پاس ورڈ</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="پاس ورڈ درج کریں"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">پاس ورڈ کی تصدیق</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="پاس ورڈ دوبارہ درج کریں"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                سائن اپ کریں
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>رابطہ کا طریقہ</Label>
                <Select value={authMethod} onValueChange={(value) => setAuthMethod(value as 'email' | 'phone')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">ای میل</SelectItem>
                    <SelectItem value="phone">فون نمبر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {authMethod === 'email' ? (
                <div className="space-y-2">
                  <Label htmlFor="signin-email">ای میل</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="signin-phone">فون نمبر</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-phone"
                      type="tel"
                      placeholder="0300 1234567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="signin-password">پاس ورڈ</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="پاس ورڈ درج کریں"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                لاگ ان کریں
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}