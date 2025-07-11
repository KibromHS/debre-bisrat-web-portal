import { supabase } from "./client";
import { dataSyncService } from "@/services/DataSyncService";

export const api = {
  sermons: {
    getSermons: async () => {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .order("sermon_date", { ascending: false });

      if (error) throw error;
      return data;
    },
    getFeaturedSermons: async (limit = 3) => {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .eq("is_featured", true)
        .order("sermon_date", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },
    getSermonById: async (id: string) => {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    createSermon: async (sermon: any) => {
      const { data, error } = await supabase
        .from("sermons")
        .insert([sermon])
        .select()
        .single();

      if (error) throw error;

      // Notify data sync service
      DataSyncService.emitEvent("sermonsChanged", data);

      return data;
    },
    updateSermon: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("sermons")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Notify data sync service
      DataSyncService.emitEvent("sermonsChanged", data);

      return data;
    },
    deleteSermon: async (id: string) => {
      const { error } = await supabase.from("sermons").delete().eq("id", id);

      if (error) throw error;

      // Notify data sync service
      DataSyncService.emitEvent("sermonsChanged", { id });

      return true;
    },
  },
  events: {
    getEvents: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) throw error;
      return data;
    },
    getUpcomingEvents: async (limit = 3) => {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", today)
        .order("event_date", { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data;
    },
    getEventById: async (id: string) => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    createEvent: async (event: any) => {
      const { data, error } = await supabase
        .from("events")
        .insert([event])
        .select()
        .single();

      if (error) throw error;

      // Notify data sync service
      DataSyncService.emitEvent("eventsChanged", data);

      return data;
    },
    updateEvent: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("events")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Notify data sync service
      DataSyncService.emitEvent("eventsChanged", data);

      return data;
    },
    deleteEvent: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);

      if (error) throw error;

      // Notify data sync service
      DataSyncService.emitEvent("eventsChanged", { id });

      return true;
    },
  },
  members: {
    getMembers: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getMemberById: async (id: string) => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    createMember: async (member: any) => {
      const { data, error } = await supabase
        .from("members")
        .insert([member])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateMember: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("members")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteMember: async (id: string) => {
      const { error } = await supabase.from("members").delete().eq("id", id);

      if (error) throw error;
      return true;
    },
  },
  gallery: {
    getGalleryImages: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getImageById: async (id: string) => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    addImage: async (image: any) => {
      const { data, error } = await supabase
        .from("gallery")
        .insert([image])
        .select()
        .single();

      if (error) throw error;

      // Notify data sync service
      DataSyncService.emitEvent("galleryChanged", data);

      return data;
    },
    updateImage: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("gallery")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteImage: async (id: string) => {
      const { error } = await supabase.from("gallery").delete().eq("id", id);

      if (error) throw error;

      // Notify data sync service
      DataSyncService.emitEvent("galleryChanged", { id });

      return true;
    },
  },
  testimonials: {
    getTestimonials: async (approvedOnly = true) => {
      let query = supabase.from("testimonials").select("*");

      if (approvedOnly) {
        query = query.eq("is_approved", true);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return data;
    },
    getTestimonialById: async (id: string) => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    addTestimonial: async (testimonial: any) => {
      const { data, error } = await supabase
        .from("testimonials")
        .insert([testimonial])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateTestimonial: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("testimonials")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteTestimonial: async (id: string) => {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    },
  },
  prayerRequests: {
    getPrayerRequests: async (publicOnly = true) => {
      let query = supabase.from("prayer_requests").select("*");

      if (publicOnly) {
        query = query.eq("is_public", true);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return data;
    },
    getPrayerRequestById: async (id: string) => {
      const { data, error } = await supabase
        .from("prayer_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    addPrayerRequest: async (request: any) => {
      const { data, error } = await supabase
        .from("prayer_requests")
        .insert([request])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updatePrayerRequest: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("prayer_requests")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deletePrayerRequest: async (id: string) => {
      const { error } = await supabase
        .from("prayer_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    },
  },
  donations: {
    getDonations: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getDonationById: async (id: string) => {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    updateDonation: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("donations")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },
  users: {
    getUsers: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getUserById: async (id: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    updateUser: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteUser: async (id: string) => {
      const { error } = await supabase.from("profiles").delete().eq("id", id);

      if (error) throw error;
      return true;
    },
    inviteAdmin: async (email: string, role: string = "admin") => {
      try {
        // Create a new user profile directly
        const { data, error } = await supabase.from("profiles").insert([
          {
            email,
            role,
          },
        ]);

        if (error) throw error;

        return { success: true, message: "User added successfully", data };
      } catch (error) {
        console.error("Error inviting admin:", error);
        throw error;
      }
    },
    getAdminCount: async () => {
      try {
        const { count, error } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("role", "admin");

        if (error) throw error;
        return count || 0;
      } catch (error) {
        console.error("Error getting admin count:", error);
        return 0;
      }
    },

    // Direct user management without registration codes
    addUser: async (email: string, role: string) => {
      const { data, error } = await supabase.from("profiles").insert([
        {
          email,
          role,
        },
      ]);

      if (error) throw error;
      return data;
    },

    updateUserRole: async (id: string, role: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ role })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    promoteToAdmin: async (userId: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    demoteFromAdmin: async (userId: string) => {
      // Check if this is the last admin
      const { count: adminCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "admin");

      if (adminCount && adminCount <= 1) {
        throw new Error("Cannot demote the last admin user");
      }

      const { data, error } = await supabase
        .from("profiles")
        .update({ role: "user" })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },
  storage: {
    uploadImage: async (file: File, folder: string = "general") => {
      // Create a unique file path
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    },
    deleteImage: async (url: string) => {
      // Extract the path from the URL
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/");
      const bucketIndex = pathParts.findIndex((part) => part === "images");
      if (bucketIndex === -1) throw new Error("Invalid image URL");

      const filePath = pathParts.slice(bucketIndex + 1).join("/");

      // Delete the file from Supabase Storage
      const { error } = await supabase.storage
        .from("images")
        .remove([filePath]);

      if (error) throw error;
      return true;
    },
  },
  admin: {
    // Simplified admin management - no registration codes needed
  },

  // Stripe Settings API
  stripeSettings: {
    getSettings: async () => {
      const { data, error } = await supabase
        .from("stripe_settings")
        .select("*")
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    updateSettings: async (settings: any) => {
      const { data, error } = await supabase
        .from("stripe_settings")
        .upsert({ id: 1, ...settings, updated_at: new Date().toISOString() })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  // Email Settings API
  emailSettings: {
    getSettings: async () => {
      const { data, error } = await supabase
        .from("email_settings")
        .select("*")
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    updateSettings: async (settings: any) => {
      const { data, error } = await supabase
        .from("email_settings")
        .upsert({ id: 1, ...settings, updated_at: new Date().toISOString() })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  // Email Subscribers API
  emailSubscribers: {
    getSubscribers: async () => {
      const { data, error } = await supabase
        .from("email_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    addSubscriber: async (subscriber: any) => {
      const { data, error } = await supabase
        .from("email_subscribers")
        .insert([subscriber])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateSubscriber: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("email_subscribers")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteSubscriber: async (id: string) => {
      const { error } = await supabase
        .from("email_subscribers")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    },
    unsubscribe: async (email: string) => {
      const { data, error } = await supabase
        .from("email_subscribers")
        .update({
          status: "unsubscribed",
          unsubscribed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("email", email)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  // Email Templates API
  emailTemplates: {
    getTemplates: async () => {
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getTemplateById: async (id: string) => {
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    createTemplate: async (template: any) => {
      const { data, error } = await supabase
        .from("email_templates")
        .insert([template])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateTemplate: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("email_templates")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteTemplate: async (id: string) => {
      const { error } = await supabase
        .from("email_templates")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    },
  },

  // Email Campaigns API
  emailCampaigns: {
    getCampaigns: async () => {
      const { data, error } = await supabase
        .from("email_campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getCampaignById: async (id: string) => {
      const { data, error } = await supabase
        .from("email_campaigns")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    createCampaign: async (campaign: any) => {
      const { data, error } = await supabase
        .from("email_campaigns")
        .insert([campaign])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateCampaign: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("email_campaigns")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteCampaign: async (id: string) => {
      const { error } = await supabase
        .from("email_campaigns")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    },
  },

  appointments: {
    getAppointments: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select(
          `
          *,
          responded_by_profile:profiles!appointments_responded_by_fkey(email)
        `,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getAppointmentById: async (id: string) => {
      const { data, error } = await supabase
        .from("appointments")
        .select(
          `
          *,
          responded_by_profile:profiles!appointments_responded_by_fkey(email)
        `,
        )
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    createAppointment: async (appointment: any) => {
      const { data, error } = await supabase
        .from("appointments")
        .insert([appointment])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateAppointment: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("appointments")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Notify data sync service
      dataSyncService.notifyAdminAction("update", "appointments", data);

      return data;
    },
    respondToAppointment: async (
      id: string,
      response: {
        status: string;
        admin_response: string;
        admin_notes?: string;
        confirmed_date?: string;
        confirmed_time?: string;
        responded_by: string;
      },
    ) => {
      const { data, error } = await supabase
        .from("appointments")
        .update({
          ...response,
          responded_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Notify data sync service
      dataSyncService.notifyAdminAction(
        "respond_appointment",
        "appointments",
        data,
      );

      return data;
    },
    deleteAppointment: async (id: string) => {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Notify data sync service
      dataSyncService.notifyAdminAction("delete", "appointments", { id });

      return true;
    },
    getAppointmentsByStatus: async (status: string) => {
      const { data, error } = await supabase
        .from("appointments")
        .select(
          `
          *,
          responded_by_profile:profiles!appointments_responded_by_fkey(email)
        `,
        )
        .eq("status", status)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  },
};
