export const permissions = [
    {
        role: 'patient',
        actions: [
            'update_profile',
            'get_staff',
            'get_staff',
            'post_review',
            'get_review',
            'update_review',
            'delete_review',
            
        ]
    },
    {
        role: 'staff',
        actions: [
            'get_profile',
            'update_profile',
            'post_staff',
            'get_staff',
            'get_staff',
            'delete_staff',
            'update_staff',
        ] 
    },
    {
        role: 'admin',
        actions: [
            'get_profile',
            'update_profile',
            'get_staff',
            'get_staff',
            'get_review',
        ] 
    }
]