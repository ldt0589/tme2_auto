import { ApiClient } from '../core/api.client';
import { getEnvConfig } from '../../configurations/env.config';
import { expect, Page } from 'playwright/test';
import { getDateRange } from '../../helpers/time.helper';
import { AuthConfig } from '../../configurations/auth.config';
import { fetchAccessToken } from '../../api/auth/auth.api';

export async function fetchWorkoutAssignments(dateRange: 'this_week' | 'next_week' | 'this_month' | 'last_week',) {
    const { startDate, endDate } = getDateRange(dateRange);
    const { apiBaseURL, clientId } = getEnvConfig();
    await fetchAccessToken();

    await ApiClient.init(apiBaseURL);
    await ApiClient.setHeaders({'x-access-token': (globalThis as any).accessToken,});
    const response = await ApiClient.get(`/api/v3/workout/assignments?start_date=${startDate}&end_date=${endDate}&client=${clientId}`);
  
    expect(response.code).toBe(200);
    const workoutData = response.body;
    console.log(`Fetched workout assignments from ${startDate} to ${endDate} successfully`);  
    
    return workoutData;
}