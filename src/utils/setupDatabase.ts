import { supabase } from '@/integrations/supabase/client';

export const setupDatabase = async () => {
  try {
    console.log('Setting up database tables...');
    
    // Test if cars table exists by trying to select from it
    const { data, error } = await supabase
      .from('cars')
      .select('id')
      .limit(1);
    
    if (error && error.message.includes('does not exist')) {
      console.log('Cars table does not exist. Please set up the database tables in Supabase.');
      return {
        success: false,
        message: 'Database tables need to be created in Supabase. Please contact your administrator.'
      };
    }
    
    console.log('Database tables are accessible.');
    return {
      success: true,
      message: 'Database is ready.'
    };
    
  } catch (error) {
    console.error('Database setup error:', error);
    return {
      success: false,
      message: 'Database connection failed. Please check your configuration.'
    };
  }
};

export const testDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('count')
      .limit(1);
    
    return { success: !error, error };
  } catch (error) {
    return { success: false, error };
  }
};