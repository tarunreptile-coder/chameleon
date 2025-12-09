'use server';
/**
 * @fileOverview A flow to export content to a CMS.
 *
 * - exportToCms - A function that takes a name and creates a content entity in Reptile CMS.
 * - ExportToCmsInput - The input type for the exportToCms function.
 * - ExportToCmsOutput - The return type for the exportToCms function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExportToCmsInputSchema = z.object({
  name: z.string(),
});
export type ExportToCmsInput = z.infer<typeof ExportToCmsInputSchema>;

const ExportToCmsOutputSchema = z.object({
  id: z.string(),
});
export type ExportToCmsOutput = z.infer<typeof ExportToCmsOutputSchema>;

export async function exportToCms(input: ExportToCmsInput): Promise<ExportToCmsOutput> {
  return exportToCmsFlow(input);
}

const exportToCmsFlow = ai.defineFlow(
  {
    name: 'exportToCmsFlow',
    inputSchema: ExportToCmsInputSchema,
    outputSchema: ExportToCmsOutputSchema,
  },
  async ({ name }) => {
    const response = await fetch('https://app.onreptile.com/api/ContentEntity/Post?organizationId=17877abd-6fdd-4103-b672-c97a429237f7', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer 0Eb4bA_QT0TDO8NdG9jjdAFU5w1H07lNcb3BBTPcneI3dQUP4cWwn7134LGmkLQuupzBLC6BAKuVwL1cbO4ovHM0Je58S8obkxcZC8QP0AxLgLJpBeEbxZ02VNJx_LxpLno-s0jYDWgIpxtLv60zRptQ9oom3rLlH0Mj0IDMnq8fS9ddZxovJKHem6N5nF-6QLHpd-5Zwd--VAXOy1sJvdyI5_LSe6K7YsEZIlJt6sWKww1Lr9sDYQQv6wcC_5EL2FWSOIbeaR0QRf8JuktlJn0sxoS-MzP4eSxGn7MKL0Z-WAc02G9cwYk-KTlP7Eg_-IK7IT7tsw5CJDjttOAAzd7chMKPf7nl3Hhoh5pLpgRijrexsM7BymJsG7g0pFxElFxAxn6CRFFkL3LpwyoKdiJDoiG4YBGskUqmHQigzstKjh2latS2XyoJt-HstxV7Oqrcb96v6P-x93Gyy9Bg5a-W6a0MUm3O8yh7W2StmqvhtPn_hwuF-Mf0OfVDSN9GFxBFqSl-_Ef3kn0gscsN_JNg8MiTllof9uYxw3MdtO39ki4OsC2VOK35a_dUz3Mw7zGNk6puV38YM5fIy-hu-436MrkGC4wgrsiWTg745peoNlCn-tHkYCSzaTJI4jFClNkjdu99B1zp7P3BNa4sEfAvPek_Ez39grXqcwxEiG8P-kpNbUcROxEL0tZ8lnn_TrzLeGkDGUzyYfG9ApeHJRFz9XvucI7C4HErz8ES329mEzndWHwWOdUkpDkq_-2qJgSNBRdOtxxpMOuTDeqMbMsxbEqaM5zlfzs5WWt49k6U2l_vE10ZSzL1GCPYKf04lOQaGeBjtt1zJ4dGGsV2byaF2Z0Y1c3oqv7wIkTeA1zMTlGUfVMfiYAwgM3KpZgcb_PHZfL299--82OvGKbyLAonH5hnHWGBhnMJOvtjrrrdazKyjqoEnqaKDETVq9Pf89v8kKKkDaNO46F_S3bfgRtO_HSNSK3yOgET5lu690YA3ay1dkRIMmdQ7_AJ83fjcxxRHiy8Ufr3iBtIPAIMg6md_ljeTTMwPQriRY-s_2FoSsuijNo9nc6J2GlA1pXsDf4W4mIFD-ohuUSk_ozgchi7e6piCSmQbT_1QRPYFH9-I9XnuzdK4tHSkwU19FZCMqeBFbPWMJQX4hQS6LmDICTmMzuUptwww9jsLuDZjI5IEqgX9ptuQCJnU8vfhDoU7S0M-uThxeOdFNOWkMgxtA4VIDZ-CEC09QHcG4ZeOlnx5ZTNkQZJh-JlAWYkvDGZQYN83z1b9WoIQMHZIjP6wgzN2BTz6WNn3YPSSlN0dcYJ-xH_hm75EOhLphYG8X-ko8OIQQoDADlzPJHbzZ_WQB-kz125sjrs1wVvdQNNo_4oKsgLjB3YitB7n46hvZZgQ6bo-QXcvMsG_GKk5C_EA3Piqz6U3zU0H9zvGeECZhuuWX-85fkx3buMfR4j5ZRYYNZodhIwJM3FrvYXAhD6CNzdFb4EVxuT8KTob9CODww'
        },
        body: JSON.stringify({
            "name": name,
            "contentEntityType": {
                "entityTypeId": 3,
                "entityTypeName": "Issue"
            },
            "parentId": "c2e0bca5-4df0-4641-a211-5cf280116757"
        }),
    });

    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    return response.json();
  }
);
